import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTasks, createTask, deleteTask, updateTask  } from '../services/tachesAPI';
import AddTask from './AddTask';

const Layout = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const loadTasks = () => {
    getTasks().then(setTasks);
  };

  const handleAddTask = async (task) => {
    try {
      if (isEdit && selectedTask) {
        await updateTask(selectedTask.id, task);
      } else {
        await createTask(task);
      }
      loadTasks();
    } finally {
      setOpen(false);
      setIsEdit(false);
      setSelectedTask(null);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete);
      loadTasks();
    } catch (error) {
      console.error('Erreur suppression', error);
    } finally {
      setOpenDelete(false);
      setTaskToDelete(null);
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <TextField
          label="Filtrer par titre"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsEdit(false);
            setSelectedTask(null);
            setOpen(true);
          }}
        >
          Ajouter
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.content}</TableCell>
                  <TableCell>
                    {new Date(task.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.status}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(task)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredTasks.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddTask
        open={open}
        onClose={() => {
          setOpen(false);
          setIsEdit(false);
          setSelectedTask(null);
        }}
        onSubmit={handleAddTask}
        isEdit={isEdit}
        task={selectedTask}
      />

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette tâche ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>
            Annuler
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Layout;
