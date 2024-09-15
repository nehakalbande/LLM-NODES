from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Define the structure of the request body
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, str]

class Edge(BaseModel):
    source: str
    target: str
    id: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Check if the pipeline forms a Directed Acyclic Graph (DAG)
    def has_cycle(graph, node, visited, rec_stack):
        visited[node] = True
        rec_stack[node] = True

        for neighbor in graph.get(node, []):
            if not visited.get(neighbor, False) and has_cycle(graph, neighbor, visited, rec_stack):
                return True
            elif rec_stack.get(neighbor, False):
                return True

        rec_stack[node] = False
        return False

    # Build adjacency list from edges
    graph = {}
    for edge in pipeline.edges:
        if edge.source not in graph:
            graph[edge.source] = []
        graph[edge.source].append(edge.target)

    # Perform cycle detection (for DAG check)
    visited = {}
    rec_stack = {}
    is_dag = True
    for node in pipeline.nodes:
        if not visited.get(node.id, False):
            if has_cycle(graph, node.id, visited, rec_stack):
                is_dag = False
                break

    # Return the number of nodes, edges, and if it's a DAG
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
