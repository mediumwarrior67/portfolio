import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import IdentityNode from './components/IdentityNode';
import SkillsNode from './components/SkillsNode';
import ProjectsNode from './components/ProjectsNode';
import ChatbotNode from './components/ChatbotNode';
import './App.css';

const nodeTypes = {
  identity: IdentityNode,
  skills: SkillsNode,
  projects: ProjectsNode,
  chatbot: ChatbotNode,
};

const initialNodes = [
  {
    id: 'header',
    type: 'identity',
    position: { x: 100, y: 50 },
    data: { 
      label: 'IDENTITY MODULE',
      name: 'MediumWarrior67',
      title: 'Full Stack Developer',
      status: 'ACTIVE',
      onLogin: null,
      onLogout: null
    },
  },
  {
    id: 'skills',
    type: 'skills',
    position: { x: 500, y: 50 },
    data: { 
      label: 'SKILLS DATABASE',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'TypeScript', level: 88 },
        { name: 'Docker', level: 75 },
      ],
      status: 'ONLINE'
    },
  },
  {
    id: 'projects',
    type: 'projects',
    position: { x: 100, y: 350 },
    data: { 
      label: 'PROJECT ARCHIVE',
      projects: [
        { name: 'E-Commerce Platform', tech: 'React, Node.js' },
        { name: 'AI Chat Bot', tech: 'Python, TensorFlow' },
        { name: 'Task Manager', tech: 'React, Firebase' },
      ],
      status: 'DEPLOYED'
    },
  },
  {
    id: 'chatbot',
    type: 'chatbot',
    position: { x: 900, y: 150 },
    data: {
      label: 'AI ASSISTANT',
      status: 'LOCKED',
      unlocked: false,
      isExpanded: false
    },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'header', 
    target: 'skills',
    animated: true,
    style: { stroke: '#58a6ff', strokeWidth: 2 },
  },
  { 
    id: 'e1-3', 
    source: 'header', 
    target: 'projects',
    animated: true,
    style: { stroke: '#58a6ff', strokeWidth: 2 },
  },
  {
    id: 'e2-5',
    source: 'skills',
    target: 'chatbot',
    animated: true,
    style: { stroke: '#30363d', strokeWidth: 2, opacity: 0.4 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('discord_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        unlockChatbot(userData);
      } catch (e) {
        localStorage.removeItem('discord_user');
      }
    }
  }, []);

  const unlockChatbot = (userData) => {
    // Update identity node and unlock chatbot
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'header') {
          return {
            ...node,
            data: {
              ...node.data,
              name: userData.username,
              discordAvatar: userData.avatar,
            },
          };
        }
        if (node.id === 'chatbot') {
          return {
            ...node,
            data: {
              ...node.data,
              status: 'READY',
              unlocked: true,
              isExpanded: true,
            },
          };
        }
        return node;
      })
    );

    // Update edge to chatbot with premium styling
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e2-5') {
          return {
            ...edge,
            animated: true,
            style: { stroke: '#58a6ff', strokeWidth: 2, opacity: 1 },
          };
        }
        return edge;
      })
    );
  };

  const lockChatbot = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'header') {
          return {
            ...node,
            data: {
              ...node.data,
              name: 'MediumWarrior67',
              discordAvatar: null,
            },
          };
        }
        if (node.id === 'chatbot') {
          return {
            ...node,
            data: {
              ...node.data,
              status: 'LOCKED',
              unlocked: false,
              isExpanded: false,
            },
          };
        }
        return node;
      })
    );

    // Update edge back to locked state
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e2-5') {
          return {
            ...edge,
            animated: true,
            style: { stroke: '#30363d', strokeWidth: 2, opacity: 0.4 },
          };
        }
        return edge;
      })
    );
  };

  const handleLogin = (userData) => {
    setUser(userData);
    unlockChatbot(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('discord_user');
    lockChatbot();
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#58a6ff', strokeWidth: 2 },
    }, eds)),
    [setEdges],
  );

  // Pass login/logout handlers to identity node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'header') {
          return {
            ...node,
            data: {
              ...node.data,
              onLogin: handleLogin,
              onLogout: handleLogout,
            },
          };
        }
        return node;
      })
    );
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background 
          color="#30363d"
          gap={16}
          size={1}
          style={{ backgroundColor: '#0d1117' }}
        />
        <Controls />
        <MiniMap 
          nodeColor={() => '#58a6ff'}
          maskColor="rgba(13, 17, 23, 0.9)"
        />
        <Panel position="top-left" className="header-panel">
          <div className="command-header">
            <div className="command-title">COMMAND PROTOCOL</div>
            <div className="command-subtitle">PORTFOLIO INTERFACE v1.0</div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
