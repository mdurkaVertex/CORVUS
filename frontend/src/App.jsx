import React, { useCallback, useState } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <button
          onClick={() => setSidebarVisible(true)}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        >
          + Nodes
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>

        <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
