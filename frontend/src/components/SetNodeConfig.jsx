import React, { useState } from 'react';
import '../components styles/SetNodeConfig.css';

function SetNodeConfig({ id, config, setNodes, onClose }) {
  const [variables, setVariables] = useState(config?.variables || []);

  const updateVar = (index, field, value) => {
    const newVars = [...variables];
    newVars[index][field] = value;
    setVariables(newVars);
  };

  const addVar = () => {
    setVariables([...variables, { name: '', value: '', type: 'string' }]);
  };

  const removeVar = (index) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const handleSave = (newConfig) => {
  // Budujemy obiekt wynikowy już teraz
  const result = {};
  for (const v of newConfig.variables || []) {
    if (!v.name) continue;
    let value = v.value;
    if (v.type === 'number') value = parseFloat(value);
    if (v.type === 'boolean') value = value === 'true' || value === true;
    result[v.name] = value;
  }

  setNodes((nodes) =>
    nodes.map((n) =>
      n.id === id
        ? { ...n, data: { ...n.data, ...newConfig, output: result } }
        : n
    )
  );

  onClose();
};


  return (
    <div className="node-config-overlay">
      <div className="node-config-modal">
        <div className="node-config-header">
          <h3>Set Variables</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="node-config-body">
          {variables.map((v, i) => (
  <div className="variable-row" key={i}>
    <input
      placeholder="name"
      value={v.name}
      onChange={(e) => updateVar(i, 'name', e.target.value)}
    />
    <select
      value={v.type}
      onChange={(e) => updateVar(i, 'type', e.target.value)}
    >
      <option value="string">string</option>
      <option value="number">number</option>
      <option value="boolean">boolean</option>
    </select>
    <input
      placeholder="value"
      value={v.value}
      onChange={(e) => updateVar(i, 'value', e.target.value)}
    />
    <button onClick={() => removeVar(i)}>🗑</button>
  </div>
))}


          <button onClick={addVar}>➕ Add Variable</button>
          <button onClick={() => handleSave({ variables })}>💾 Save</button>
        </div>
      </div>
    </div>
  );
}

export default SetNodeConfig;
