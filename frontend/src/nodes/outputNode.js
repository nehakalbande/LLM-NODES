import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Box, TextField, MenuItem } from '@mui/material';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Output"
      data={{ content: (
        <Box>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={currName}
            onChange={handleNameChange}
            sx={{ mb: 1 }}
          />
          <TextField
            select
            label="Type"
            variant="outlined"
            fullWidth
            value={outputType}
            onChange={handleTypeChange}
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="File">Image</MenuItem>
          </TextField>
        </Box>
      )}}
      handles={[
        { id: 'value', type: 'target', position: 'Left' }
      ]}
    />
  );
};
