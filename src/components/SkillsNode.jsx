import { Handle, Position } from '@xyflow/react';

function SkillsNode({ data }) {
  return (
    <div className="node-container">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">💾</span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot online"></span>
          {data.status}
        </div>
      </div>
      <div className="node-content">
        <div className="skills-list">
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default SkillsNode;
