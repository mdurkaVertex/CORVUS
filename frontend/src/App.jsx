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
import ResultNode from './nodes/ResultNode';
import FlowEngine from './engine/FlowEngine';
import logicRegistry from './engine/initLogicRegistry';

const nodeTypes = {
  openai: OpenAiNode,
  http: HttpNode,
  delay: DelayNode,
  result: ResultNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [rfInstance, setRfInstance] = useState(null);

  const handleTestWorkflow = async () => {
    if (!rfInstance) return;

    const allNodes = rfInstance.getNodes();
    const allEdges = rfInstance.getEdges();

    // Walidacja
    const validationErrors = logicRegistry.validateAll(allNodes);
    if (validationErrors.length > 0) {
      console.warn('❌ Walidacja zakończona błędami:');
      validationErrors.forEach((err) => console.warn(err));
      alert(`Workflow zatrzymany z ${validationErrors.length} błędami`);
      return;
    }

    const engine = new FlowEngine(allNodes, allEdges, setNodes);

    for (const node of allNodes) {
      if (node.type === 'openai') {
        await engine.executeFrom(node.id);
      }
    }
  };

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
          onInit={setRfInstance}
        >
          <Background />
          <Controls />
          <MiniMap
            style={{ backgroundColor: '#1e1e1e' }}
            nodeColor={() => '#fa6926'}
            nodeStrokeColor={() => '#ffffff'}
            nodeBorderRadius={2}
          />

          <button
          onClick={handleTestWorkflow}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            backgroundColor: '#fa6926',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          ▶ Test Workflow
        </button>

        </ReactFlow>

      </div>
    </ReactFlowProvider>
  );
}

export default App;
