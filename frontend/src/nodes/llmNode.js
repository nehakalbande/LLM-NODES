import { BaseNode } from './BaseNode';
import { Box, Typography } from '@mui/material';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      data={{ content: (
        <Box>
          <Typography>This is an LLM.</Typography>
        </Box>
      )}}
      handles={[
        { id: 'system', type: 'target', position: 'Left', style: { top: '33%' } },
        { id: 'prompt', type: 'target', position: 'Left', style: { top: '66%' } },
        { id: 'response', type: 'source' }
      ]}
    />
  );
};
