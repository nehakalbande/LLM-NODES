import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { TextField } from '@mui/material';
import { Handle, Position } from 'reactflow';

const isValidVariableName = (name) => {
  // Basic check for a valid JavaScript variable name
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name.trim());
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });

  useEffect(() => {
    // Adjust width and height based on text length
    const newWidth = Math.max(200, currText.length * 10); // Calculate width dynamically
    const newHeight = Math.max(80, currText.split('\n').length * 20); // Adjust height based on line count
    setDimensions({ width: newWidth, height: newHeight });

    // Detect variables in the text input
    const variableMatches = [...currText.matchAll(/\{\{\s*(\w+)\s*\}\}/g)];
    const newHandles = variableMatches
      .map((match) => match[1])
      .filter(isValidVariableName)
      .map((variable, index) => ({
        id: variable,
        type: 'target',
        position: Position.Left,
        style: { top: `${(index + 1) * 20}px` },
      }));

    setHandles(newHandles);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Text"
      data={{
        content: (
          <TextField
            label="Text"
            variant="outlined"
            multiline
            fullWidth
            value={currText}
            onChange={handleTextChange}
            sx={{
              width: '100%',
              height: '100%',
              padding: '5px',
            }}
          />
        ),
      }}
      handles={[
        ...handles,
        { id: 'output', type: 'source', position: Position.Right },
      ]}
      sx={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
};
