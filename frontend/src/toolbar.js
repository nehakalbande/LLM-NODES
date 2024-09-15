import { DraggableNode } from './draggableNode';
import { Box } from '@mui/material';

export const PipelineToolbar = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
      </Box>
    </Box>
  );
};
