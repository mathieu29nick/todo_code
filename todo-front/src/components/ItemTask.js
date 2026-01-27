import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ItemTask = ({ open, onClose, task }) => {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Détail de la tâche</DialogTitle>

      <DialogContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>

        <Typography variant="body1">
          {task.content}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemTask;
