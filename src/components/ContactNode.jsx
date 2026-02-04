import { Handle, Position } from '@xyflow/react';

function ContactNode({ data }) {
  return (
    <div className="node-container">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">🔐</span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot secure"></span>
          {data.status}
        </div>
      </div>
      <div className="node-content">
        <div className="contact-list">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span className="contact-value">{data.email}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💻</span>
            <span className="contact-value">github.com/{data.github}</span>
          </div>
        </div>
        <button className="action-button">Establish Connection</button>
      </div>
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
    </div>
  );
}

export default ContactNode;
