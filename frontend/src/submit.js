import { Button, Box } from '@mui/material';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data
            })),
            edges: edges.map(edge => ({
                source: edge.source,
                target: edge.target,
                id: edge.id
            }))
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pipelineData)
            });
            
            const result = await response.json();
            alert(`Number of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${result.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            console.error('Error submitting the pipeline:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
