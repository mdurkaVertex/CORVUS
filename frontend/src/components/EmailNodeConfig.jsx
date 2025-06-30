import React, { useState } from 'react';
import '../components styles/OpenAiNodeConfig.css';

function EmailNodeConfig({ onClose, onSave, config }) {
  const [recipient, setRecipient] = useState(config?.recipient || '');

  const handleSave = () => {
    onSave({ recipient });
    onClose();
  };

  return (
    <div className="node-config-overlay">
      <div className="node-config-modal">
        <div className="node-config-header">
          <h3>Email node config</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="node-config-body">
          <label>Recipitient adress:</label>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="np. user@example.com"
            style={{
              backgroundColor: '#1e1e1e',
              color: 'white',
              padding: 8,
              borderRadius: 4,
              width: '100%',
              border: '1px solid #fa6926'
            }}
          />

          <button onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailNodeConfig;
