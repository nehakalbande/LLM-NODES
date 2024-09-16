import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, TextField } from '@mui/material';

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;
  let match;
  const variables = [];
  
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]); 
  }
  
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 }); 

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    const extractedVariables = extractVariables(newText);
    setVariables(extractedVariables);
    
    const newWidth = Math.max(200, newText.length * 8); 
    const newHeight = Math.max(80, newText.split('\n').length * 25); 
    setNodeSize({ width: newWidth, height: newHeight });
  };

  return (
    <Box sx={{ width: nodeSize.width, height: nodeSize.height, border: '1px solid black', padding: 1, borderRadius: 1 }}>
      <div>
        <span>Text Node</span>
      </div>
      <div>
        <TextField
          fullWidth
          multiline
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{ variable }}"
          variant="outlined"
          size="small"
          sx={{ width: '100%', height: '100%' }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />

      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${(index + 1) * (100 / (variables.length + 1))}%` }} // evenly distribute the handles
        />
      ))}
    </Box>
  );
};
