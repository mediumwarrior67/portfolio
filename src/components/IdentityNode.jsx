import { Handle, Position } from '@xyflow/react';

function IdentityNode({ data }) {
  return (
    <div className="node-container">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">
            {data.discordAvatar ? (
              <img 
                src={data.discordAvatar} 
                alt="Avatar" 
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%',
                  border: '2px solid #5865F2',
                  boxShadow: '0 0 10px rgba(88, 101, 242, 0.5)'
                }} 
              />
            ) : (
              '👤'
            )}
          </span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot active"></span>
          {data.status}
        </div>
      </div>
      <div className="node-content identity-info">
        <div className="info-field">
          <span className="field-label">Operator_Tag</span>
          <span className="field-value">{data.name}</span>
        </div>
        <div className="info-field">
          <span className="field-label">Classification</span>
          <span className="field-value">{data.title}</span>
        </div>
        <button className="action-button">View Full Profile</button>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default IdentityNode;
