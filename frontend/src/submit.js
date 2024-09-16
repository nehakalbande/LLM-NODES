import { Button } from '@mui/material';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import axios from 'axios';
import { useReactFlow } from 'reactflow';


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  updateNodeField: state.updateNodeField,
});

export const SubmitButton = () => {
  const { nodes, edges,updateNodeField } = useStore(selector, shallow);
  const { setNodes } = useReactFlow();

  const handleSubmit = async () => {
    try {

      console.log('Nodes before submitting:', nodes);

      const response = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes,
        edges
      });

      const { num_nodes, num_edges, is_dag, llm_result } = response.data;

      console.log('LLM Result:', llm_result);
      const outputNode = nodes.find(node => node.type === 'customOutput');

      if (outputNode) {

        updateNodeField(outputNode.id, 'outputName', llm_result);
        console.log(`Updating OutputNode (ID: ${outputNode.id}) with LLM result: ${llm_result}`);
        setNodes((currentNodes) =>
          currentNodes.map((node) =>
            node.id === outputNode.id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    outputName: llm_result, 
                  },
                }
              : node
          )
        );
      }

      alert(`Nodes: ${num_nodes}\nEdges: ${num_edges}\nIs DAG: ${is_dag ? 'Yes' : 'No'}\nLLM Result: ${llm_result}`);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Failed to submit pipeline.');
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ display: 'block', margin: '0 auto', mt: 2 }}>
      Submit
    </Button>
  );
};
