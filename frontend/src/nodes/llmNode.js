import { BaseNode } from './BaseNode';
import { Box, Typography } from '@mui/material';

export const LLMNode = ({ id, data }) => {
  const renderContent = () => (
    <Box>
      <Typography variant="body2" color="textSecondary">
        This is an LLM node.
      </Typography>
    </Box>
  );

  return <BaseNode id={id} data={data} type="LLM" inputs={['system', 'prompt']} outputs={['response']} renderContent={renderContent} />;
};
