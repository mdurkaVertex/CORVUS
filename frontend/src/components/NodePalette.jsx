import React from 'react';

const nodeTypes = [
  { type: 'openai', label: 'OpenAI' },
  { type: 'http', label: 'HTTP Request' },
  { type: 'delay', label: 'Delay' },
  { type: 'result', label: 'Result' },
  { type: 'email', label: 'Email'},
  { type: 'set', label: 'Set'}
];

function NodePalette() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ padding: '10px' }}>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable
          style={{
            marginBottom: 10,
            padding: '8px 12px',
            backgroundColor: '#1e1e1e',
            border: '1px solid #fa6926',
            borderRadius: 4,
            cursor: 'grab',
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default NodePalette;
