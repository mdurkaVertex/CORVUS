import React from 'react';
import { Handle, Position } from 'reactflow';
import httpIcon from '../assets/http_logo.png';
import useNodeContextMenuHandler from '../hooks/useNodeContextMenuHandler';
import useNodeErrorTooltip from '../hooks/useNodeErrorTooltip';

function HttpNode({ id, data }) {

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
        justifyContent: 'center',
        minWidth: 100,
      }}
    >
      <img src={httpIcon} alt="HTTP" style={{ width: 40, height: 40, marginBottom: 5 }} />
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default HttpNode;
