import { BaseNode } from './BaseNode';

export const CustomNode = ({ id, data }) => {
  const renderContent = (nodeData, handleChange) => (
    <>
      <label>
        Custom Data:
        <input 
          type="text" 
          value={nodeData.customData || 'Custom'} 
          onChange={(e) => handleChange('customData', e.target.value)} 
        />
      </label>
    </>
  );

  return <BaseNode id={id} data={data} type="Custom" inputs={['input']} outputs={['output']} renderContent={renderContent} />;
};
