import { BaseNode } from './BaseNode';
import { Box, Typography } from '@mui/material';

export const OutputNode = ({ id, data }) => {
  
  const renderContent = (nodeData) => (
    <Box>
      <Typography>{nodeData.outputName || 'No result yet'}</Typography> {/* Display the output */}
    </Box>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      type="Output"
      inputs={['value']}
      outputs={[]}
      renderContent={renderContent}
    />
  );
};
