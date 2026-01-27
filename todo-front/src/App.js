import { Container, Typography } from '@mui/material';
import Layout from './components/Layout';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <Layout />
    </Container>
  );
}

export default App;
