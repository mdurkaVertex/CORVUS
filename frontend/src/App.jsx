import React, { useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';
import OpenAiNode from './nodes/OpenAiNode';
import HttpNode from './nodes/HttpNode';
import DelayNode from './nodes/DelayNode';

const nodeTypes = {
  openai: OpenAiNode,
  http: HttpNode,
  delay: DelayNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

        <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
          {!sidebarVisible && (
            <button
            onClick={() => setSidebarVisible(true)}
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
            >
            + Nodes
            </button>
          )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <Controls />

          <MiniMap
            style={{ backgroundColor: '#1e1e1e' }}
            nodeColor={() => '#fa6926'}
            nodeStrokeColor={() => '#ffffff'}
            nodeBorderRadius={2}
          />
          
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
