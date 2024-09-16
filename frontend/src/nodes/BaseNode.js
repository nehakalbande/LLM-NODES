import { Handle, Position, useReactFlow } from 'reactflow';
import { useState } from 'react';

export const BaseNode = ({ id, data, type, inputs = [], outputs = [], renderContent }) => {
  const [nodeData, setNodeData] = useState(data || {});
  const { setNodes } = useReactFlow();


  const handleChange = (field, value) => {
    const updatedData = { ...nodeData, [field]: value };
    setNodeData(updatedData);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: updatedData,  
            }
          : node
      )
    );
  };

  return (
    <div style={{width: 200, height: 100, border: '1px solid black'}}>
      <div>
        <span>{type}</span>
      </div>
      
      <div>
        {renderContent(nodeData, handleChange)}
      </div>

      {inputs.map((input, idx) => (
        <Handle
          key={`${id}-${input}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input}`}
          style={{top: `${(idx + 1) * (100 / (inputs.length + 1))}%`}}
        />
      ))}

      {outputs.map((output, idx) => (
        <Handle
          key={`${id}-${output}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          style={{top: `${(idx + 1) * (100 / (outputs.length + 1))}%`}}
        />
      ))}
    </div>
  );
};
