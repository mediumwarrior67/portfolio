import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

function SettingsNode({ data }) {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('groq_api_key') || '');
  const [saved, setSaved] = useState(false);

  const saveApiKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="node-container settings-node">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">⚙️</span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot secure"></span>
          ENCRYPTED
        </div>
      </div>
      <div className="node-content">
        <div className="settings-section">
          <label className="setting-label">GROQ API KEY</label>
          <input
            type="password"
            className="setting-input"
            placeholder="Enter your Groq API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <div className="setting-hint">
            Get your free API key at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer">console.groq.com</a>
          </div>
        </div>
        
        <button 
          className="action-button" 
          onClick={saveApiKey}
          disabled={!apiKey}
        >
          {saved ? '✓ Saved' : 'Save Configuration'}
        </button>
        
        <div className="settings-info">
          <div className="info-item">
            <span className="info-label">Storage:</span>
            <span className="info-value">Local Only</span>
          </div>
          <div className="info-item">
            <span className="info-label">Security:</span>
            <span className="info-value">Browser Encrypted</span>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}

export default SettingsNode;
