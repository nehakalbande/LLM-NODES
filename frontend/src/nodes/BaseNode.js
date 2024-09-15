import { Handle, Position } from 'reactflow';
import { Box, Paper, Typography } from '@mui/material';

export const BaseNode = ({ id, data, label, handles }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, width: 200, height: 100, position: 'relative', borderRadius: 2 }}>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" component="div">
          {label}
        </Typography>
      </Box>
      <Box>
        {data.content || ''}
      </Box>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position || Position.Right}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </Paper>
  );
};
