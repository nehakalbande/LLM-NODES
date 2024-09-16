import { BaseNode } from './BaseNode';
import { Box, TextField, MenuItem } from '@mui/material';

export const InputNode = ({ id, data }) => {
  const renderContent = (nodeData, handleChange) => (
    <Box>
      <TextField 
        label="Name"
        value={nodeData.inputName || 'input'} 
        onChange={(e) => handleChange('inputName', e.target.value)} 
        fullWidth
        size="small"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Type"
        select
        value={nodeData.inputType || 'Text'} 
        onChange={(e) => handleChange('inputType', e.target.value)} 
        fullWidth
        size="small"
      >
        <MenuItem value="Text">Text</MenuItem>
        <MenuItem value="File">File</MenuItem>
      </TextField>
    </Box>
  );

  return <BaseNode id={id} data={data} type="Input" inputs={[]} outputs={['value']} renderContent={renderContent} />;
};
