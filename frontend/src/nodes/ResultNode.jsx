import React from 'react';
import { Handle, Position } from 'reactflow';
import useNodeContextMenuHandler from '../hooks/useNodeContextMenuHandler';
import useNodeErrorTooltip from '../hooks/useNodeErrorTooltip';

function ResultNode({ id, data }) {
  const borderColor =
    {
      success: '#3aff64',
      executing: '#ffcc00',
      error: '#fa3434',
    }[data.status] || '#fa6926';

  const content = data.input ?? '[no data]';
  const handleContextMenu = useNodeContextMenuHandler(id);
  const { title } = useNodeErrorTooltip(id, data);

  return (
    <div 
      title={title}
      onContextMenu={handleContextMenu}
      style={{
      background: '#1e1e1e',
      color: '#fff',
      border: `2px solid ${borderColor}`,
      borderRadius: 6,
      padding: 10,
      minWidth: 150,
      maxWidth: 250,
      wordWrap: 'break-word',
    }}>
      <div style={{ fontWeight: 'bold' }}>Result:</div>
      <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
        {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
      </pre>
      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default ResultNode;
