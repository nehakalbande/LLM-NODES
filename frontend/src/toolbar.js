import { DraggableNode } from './draggableNode';
import { Box, Typography } from '@mui/material';

export const PipelineToolbar = () => {
  return (
    <Box sx={{ p: 2, bgcolor: 'primary.dark', borderRadius: 1 }}>
      <Typography variant="h6" color="secondary" gutterBottom>
        Node Toolbox
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
      </Box>
    </Box>
  );
};
