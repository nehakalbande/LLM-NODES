import { BaseNode } from './BaseNode';

export const ImageNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="Image"
      data={{ content: <span>Image Node</span> }}
      handles={[
        { id: 'imageInput', type: 'target', position: 'Left' },
        { id: 'imageOutput', type: 'source' }
      ]}
    />
  );
};
