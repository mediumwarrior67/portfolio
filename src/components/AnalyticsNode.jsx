import { Handle, Position } from '@xyflow/react';
import { useState, useEffect } from 'react';

function AnalyticsNode({ data }) {
  const [stats, setStats] = useState({
    visits: 0,
    loginTime: '',
    sessionDuration: 0,
  });

  useEffect(() => {
    // Get or initialize visit count
    const visits = parseInt(localStorage.getItem('portfolio_visits') || '0') + 1;
    localStorage.setItem('portfolio_visits', visits.toString());

    const loginTime = new Date().toLocaleTimeString();
    const startTime = Date.now();

    setStats({
      visits,
      loginTime,
      sessionDuration: 0,
    });

    // Update session duration every second
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      setStats(prev => ({ ...prev, sessionDuration: duration }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="node-container analytics-node">
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">📊</span>
          {data.label}
        </div>
        <div className="status-indicator">
          <span className="status-dot online"></span>
          TRACKING
        </div>
      </div>
      <div className="node-content">
        <div className="analytics-stats">
          <div className="stat-item">
            <div className="stat-icon">🔢</div>
            <div className="stat-info">
              <div className="stat-label">Total Visits</div>
              <div className="stat-value">{stats.visits}</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">🕐</div>
            <div className="stat-info">
              <div className="stat-label">Login Time</div>
              <div className="stat-value">{stats.loginTime}</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <div className="stat-label">Session Duration</div>
              <div className="stat-value">{formatDuration(stats.sessionDuration)}</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🌐</div>
            <div className="stat-info">
              <div className="stat-label">Access Level</div>
              <div className="stat-value premium">PREMIUM</div>
            </div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default AnalyticsNode;
