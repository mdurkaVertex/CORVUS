import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import delayIcon from '../assets/delay_logo2.png';
import useNodeContextMenuHandler from '../hooks/useNodeContextMenuHandler';
import useNodeErrorTooltip from '../hooks/useNodeErrorTooltip';
import DelayNodeConfig from '../components/DelayNodeConfig';

function DelayNode({ id, data }) {
  const borderColor = {
    success: '#3aff64',
    executing: '#ffcc00',
    error: '#fa3434',
  }[data.status] || '#fa6926';

  const handleContextMenu = useNodeContextMenuHandler(id);
  const { title } = useNodeErrorTooltip(id, data);
  const [showConfig, setShowConfig] = useState(false);

  const { setNodes } = useReactFlow(); // jeśli nie masz w hooku, dodaj przez useReactFlow

  const handleSave = (newConfig) => {
    setNodes((nodes) =>
      nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...newConfig } } : n))
    );
  };

  return (
    <div
      title={title}
      onContextMenu={handleContextMenu}
      style={{
        background: '#2c2c2c',
        color: '#fff',
        border: `2px solid ${borderColor}`,
        borderRadius: 6,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
      }}
    >
      <img src={delayIcon} alt="Delay" style={{ width: 40, height: 40, marginBottom: 5 }} />
      <div>{data.label}</div>
      <div style={{ fontSize: '0.8em', margin: '4px 0' }}>
        {data.seconds ? `${data.seconds}s` : 'No delay'}
      </div>

      <button onClick={() => setShowConfig(true)}>⚙</button>
      {showConfig && (
        <DelayNodeConfig config={data} onSave={handleSave} onClose={() => setShowConfig(false)} />
      )}

      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default DelayNode;
