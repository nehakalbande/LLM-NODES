import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Box, TextField, MenuItem } from '@mui/material';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
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
            value={inputType}
            onChange={handleTypeChange}
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="File">File</MenuItem>
          </TextField>
        </Box>
      )}}
      handles={[
        { id: 'value', type: 'source' }
      ]}
    />
  );
};
