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
import ContactNode from './components/ContactNode';
import ChatbotNode from './components/ChatbotNode';
import DiscordLogin from './components/DiscordLogin';
import './App.css';

const nodeTypes = {
  identity: IdentityNode,
  skills: SkillsNode,
  projects: ProjectsNode,
  contact: ContactNode,
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
      status: 'ACTIVE'
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
    id: 'contact',
    type: 'contact',
    position: { x: 500, y: 350 },
    data: { 
      label: 'COMMUNICATION LAYER',
      email: 'contact@mediumwarrior.dev',
      github: 'mediumwarrior67',
      status: 'SECURE'
    },
  },
  {
    id: 'chatbot',
    type: 'chatbot',
    position: { x: 900, y: 150 },
    data: {
      label: 'AI ASSISTANT',
      status: 'LOCKED',
      unlocked: false
    },
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'header', 
    target: 'skills',
    animated: true,
    style: { stroke: '#00ffff', strokeWidth: 2 },
  },
  { 
    id: 'e1-3', 
    source: 'header', 
    target: 'projects',
    animated: true,
    style: { stroke: '#00ffff', strokeWidth: 2 },
  },
  { 
    id: 'e2-4', 
    source: 'skills', 
    target: 'contact',
    animated: true,
    style: { stroke: '#00ffff', strokeWidth: 2 },
  },
  { 
    id: 'e3-4', 
    source: 'projects', 
    target: 'contact',
    animated: true,
    style: { stroke: '#00ffff', strokeWidth: 2 },
  },
  {
    id: 'e2-5',
    source: 'skills',
    target: 'chatbot',
    animated: true,
    style: { stroke: '#666666', strokeWidth: 2, opacity: 0.3 },
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
            style: { stroke: '#8a2be2', strokeWidth: 2, opacity: 1 },
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
            style: { stroke: '#666666', strokeWidth: 2, opacity: 0.3 },
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
      style: { stroke: '#00ffff', strokeWidth: 2 },
    }, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="auth-panel">
        <DiscordLogin onLogin={handleLogin} user={user} onLogout={handleLogout} />
      </div>
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
          color="#00ffff"
          gap={16}
          size={1}
          style={{ backgroundColor: '#0a0e1a' }}
        />
        <Controls />
        <MiniMap 
          nodeColor={() => '#00ffff'}
          maskColor="rgba(10, 14, 26, 0.8)"
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
