// src/components/DelayNodeConfig.jsx
import React, { useState } from 'react';
import '../components styles/OpenAiNodeConfig.css'; // jeśli chcesz styl osobny

function DelayNodeConfig({ config, onSave, onClose }) {
  const [seconds, setSeconds] = useState(config?.seconds || 1);

  const handleSave = () => {
    onSave({ seconds });
    onClose();
  };

  return (
    <div className="node-config-overlay">
      <div className="node-config-modal">
        <div className="node-config-header">
          <h3>Delay node config</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="node-config-body">
          <label>Delay (seconds):</label>
          <input
            type="number"
            min={0}
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default DelayNodeConfig;
