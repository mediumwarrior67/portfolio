import { Handle, Position } from '@xyflow/react';

function ProjectsNode({ data }) {
  return (
    <div className="node-container">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">📁</span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot deployed"></span>
          {data.status}
        </div>
      </div>
      <div className="node-content">
        <div className="projects-list">
          {data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-name">{project.name}</div>
              <div className="project-tech">{project.tech}</div>
            </div>
          ))}
        </div>
      </div>
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}

export default ProjectsNode;
