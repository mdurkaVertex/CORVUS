import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import emailIcon from '../assets/email_icon.png'; 
import EmailNodeConfig from '../components/EmailNodeConfig';
import useNodeContextMenuHandler from '../hooks/useNodeContextMenuHandler';
import useNodeErrorTooltip from '../hooks/useNodeErrorTooltip';

function EmailNode({ id, data }) {
  const [showConfig, setShowConfig] = useState(false);
  const { setNodes } = useReactFlow();

  const handleSave = (newConfig) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newConfig } } : n
      )
    );
  };

  const borderColor = 
  {
  success: '#3aff64',
  executing: '#ffcc00',
  error: '#fa3434',
  }[data.status] || '#fa6926';

  const handleContextMenu = useNodeContextMenuHandler(id);
  const { title } = useNodeErrorTooltip(id, data);

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
      minWidth: 120
    }}>
      <img src={emailIcon} alt="Email" style={{ width: 40, height: 40 }} />
      <div>{data.label}</div>
      <button onClick={() => setShowConfig(true)}>⚙</button>

      {showConfig && (
        <EmailNodeConfig
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

export default EmailNode;
