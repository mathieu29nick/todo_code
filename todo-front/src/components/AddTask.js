import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';

const AddTask = ({ open, onClose, onSubmit, isEdit, task }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title);
      setContent(task.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [isEdit, task, open]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await onSubmit({
        title,
        content,
      });

      setTitle('');
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEdit ? 'Modifier la tâche' : 'Ajouter une tâche'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Titre"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          color={isEdit ? "secondary" : "success"}
          disabled={!title || loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isEdit ? (
            'Modifier'
          ) : (
            'Ajouter'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
