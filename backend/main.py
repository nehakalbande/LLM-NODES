from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3002"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class Node(BaseModel):
    id: str
    type: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str

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
    
    llm_node = next((node for node in pipeline.nodes if node.type == 'llm'), None)
    llm_result = ""
    
    if llm_node:
        input_node = next((node for node in pipeline.nodes if node.type == 'customInput'), None)
        if input_node:
            input_text = input_node.data.get('inputName', '')
            if input_text == "Hello, how are you?":
                llm_result = "Bonjour, comment ça va?"
            elif input_text == "Good morning":
                llm_result = "Bonjour"
            else:
                llm_result = f"Translated: {input_text}" 

    is_dag = check_if_dag(pipeline.nodes, pipeline.edges)

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag, 'llm_result': llm_result }

def check_if_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    rec_stack = set()

    def dfs(v):
        if v in rec_stack:
            return False
        if v in visited:
            return True

        visited.add(v)
        rec_stack.add(v)

        for neighbor in graph[v]:
            if not dfs(neighbor):
                return False

        rec_stack.remove(v)
        return True

    for node in nodes:
        if node.id not in visited:
            if not dfs(node.id):
                return False

    return True
