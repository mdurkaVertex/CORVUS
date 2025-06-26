import React from 'react';
import { Handle, Position } from 'reactflow';
import openaiIcon from '../assets/openai_logo.png';

function OpenAiNode({ data }) {
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
      <img src={openaiIcon} alt="OpenAI" style={{ width: 40, height: 40, marginBottom: 5}} />
      <div>{data.label}</div>
      <Handle type="target" position={Position.Left} style={{ background: '#fa6926' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#fa6926' }} />
    </div>
  );
}

export default OpenAiNode;
