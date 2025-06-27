import React, { useState } from 'react';
import '../components styles/OpenAiNodeConfig.css'; // styl w osobnym pliku

function OpenAiNodeConfig({ onClose, onSave, config }) {

  const apiKey = localStorage.getItem('openai_key') || import.meta.env.VITE_OPENAI_API_KEY || '';

  const [tool, setTool] = useState(config?.tool || 'none');
  const [prompt, setPrompt] = useState(config?.prompt || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    onSave({ tool, prompt, connectionStatus: status });  // ← przekazujemy zmiany do node’a
    onClose();
  };

  const testConnection = async () => {
  setLoading(true);
  setError('');
  setStatus('');

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      setStatus('valid');
      onSave({ tool, prompt, connectionStatus: 'valid' }); // ⬅ zapis od razu
    } else {
      setStatus('invalid');
      setError('Invalid API key or access denied');
      onSave({ tool, prompt, connectionStatus: 'invalid' });
    }
  } catch (err) {
    console.log(err);
    setStatus('invalid');
    setError('Connection error');
    onSave({ tool, prompt, connectionStatus: 'invalid' });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="node-config-overlay">
      <div className="node-config-modal">
        <div className="node-config-header">
          <h3>Konfiguracja OpenAI</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="node-config-body">

          <label>Klucz API (globalny):</label>
          <p
            style={{
            backgroundColor: '#1e1e1e',
            color: apiKey ? '#3aff64' : '#fa6926',
            padding: 8,
            borderRadius: 4,
            border: `1px solid ${status === 'valid' ? '#3aff64' : '#fa6926'}`,
            fontSize: '0.9em',
            }}
          >
            {apiKey ? '✔ API key found' : '✖ No API key'}
          </p>

          <label>Tool:</label>

          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            <option value="none">Brak</option>
            <option value="web_search_preview">Web Search</option>
          </select>

          <label>Prompt:</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} />

          <button onClick={testConnection} disabled={loading}>
            {loading ? 'Sending...' : 'Test connection'}
          </button>

          <button onClick={handleSave} disabled={loading}>
            Save
          </button>

          {error && <div className="error-msg">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default OpenAiNodeConfig;
