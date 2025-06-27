import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import openaiIcon from '../assets/openai_logo.png';
import OpenAiNodeConfig from '../components/OpenAiNodeConfig';

function OpenAiNode({ id, data }) {
  const [showConfig, setShowConfig] = useState(false);
  const { setNodes } = useReactFlow();

  const handleSave = (newConfig) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newConfig } } : n
      )
    );
  };

  const connectionStatus = data?.connectionStatus;

  return (
    <div
      style={{
        background: '#2c2c2c',
        color: '#fff',
        border: '1px solid #fa6926',
        borderRadius: 6,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
      }}
    >
      <img src={openaiIcon} alt="OpenAI" style={{ width: 40, height: 40, marginBottom: 5 }} />
      <div>{data.label}</div>

      {/* Status wizualny */}
      {connectionStatus === 'valid' && <div style={{ color: '#3aff64', fontSize: 14 }}>✔</div>}
      {connectionStatus === 'invalid' && <div style={{ color: '#fa6926', fontSize: 14 }}>✖</div>}

      <button onClick={() => setShowConfig(true)}>⚙</button>

      {showConfig && (
        <OpenAiNodeConfig
          config={data}
          onSave={handleSave}
          onClose={() => setShowConfig(false)}
        />
      )}

      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default OpenAiNode;
