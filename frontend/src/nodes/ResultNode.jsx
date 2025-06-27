import React from 'react';
import { Handle, Position } from 'reactflow';

function ResultNode({ data }) {
  return (
    <div style={{
      background: '#1e1e1e',
      color: '#fff',
      border: '1px solid #fa6926',
      borderRadius: 6,
      padding: 10,
      minWidth: 150,
      maxWidth: 250,
      wordWrap: 'break-word',
    }}>
      <div style={{ fontWeight: 'bold' }}>Result:</div>
      <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
        {typeof data.output === 'string' ? data.output : JSON.stringify(data.output, null, 2)}
      </pre>
      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default ResultNode;
