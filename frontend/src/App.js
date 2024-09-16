import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Box } from '@mui/material';
import { ReactFlowProvider } from 'reactflow'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: '#fff', minHeight: '100vh' }}>
        <PipelineToolbar />
        <ReactFlowProvider>
          <PipelineUI />
          <SubmitButton />
        </ReactFlowProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
