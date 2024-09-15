import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ p: 2 }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </Box>
  );
}

export default App;
