import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import SetNodeConfig from '../components/SetNodeConfig';
import useNodeContextMenuHandler from '../hooks/useNodeContextMenuHandler';
import useNodeErrorTooltip from '../hooks/useNodeErrorTooltip';
import setIcon from '../assets/set.png'; // np. ikonka koła zębatego

function SetNode({ id, data }) {
  const [showConfig, setShowConfig] = useState(false);
  const { setNodes } = useReactFlow();

  const handleSave = (newConfig) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newConfig } } : n
      )
    );
  };

  const handleContextMenu = useNodeContextMenuHandler(id);
  const { title } = useNodeErrorTooltip(id, data);

  return (
    <div
      title={title}
      onContextMenu={handleContextMenu}
      style={{
        background: '#222',
        color: '#fff',
        border: `2px solid #fa6926`,
        borderRadius: 6,
        padding: 10,
        minWidth: 100,
      }}
    >
      <img src={setIcon} alt="Set" style={{ width: 36, marginBottom: 5 }} />
      <div>🛠 Set Fields</div>

      <button onClick={() => setShowConfig(true)}>⚙</button>

      {showConfig && (
        <SetNodeConfig
          id={id}
          config={data}
          onSave={handleSave}
          onClose={() => setShowConfig(false)}
          setNodes={setNodes}
        />
      )}

      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default SetNode;
