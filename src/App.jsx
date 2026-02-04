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
import SettingsNode from './components/SettingsNode';
import AnalyticsNode from './components/AnalyticsNode';
import DiscordLogin from './components/DiscordLogin';
import './App.css';

const nodeTypes = {
  identity: IdentityNode,
  skills: SkillsNode,
  projects: ProjectsNode,
  contact: ContactNode,
  chatbot: ChatbotNode,
  settings: SettingsNode,
  analytics: AnalyticsNode,
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
        // Add premium nodes when user logs in
        addPremiumNodes(userData);
      } catch (e) {
        localStorage.removeItem('discord_user');
      }
    }
  }, []);

  const addPremiumNodes = (userData) => {
    // Add premium nodes for logged-in users
    const premiumNodes = [
      {
        id: 'chatbot',
        type: 'chatbot',
        position: { x: 900, y: 50 },
        data: {
          label: 'AI ASSISTANT',
          status: 'READY'
        },
      },
      {
        id: 'settings',
        type: 'settings',
        position: { x: 900, y: 350 },
        data: {
          label: 'SETTINGS MODULE',
          status: 'SECURE'
        },
      },
      {
        id: 'analytics',
        type: 'analytics',
        position: { x: 500, y: 550 },
        data: {
          label: 'ANALYTICS DASHBOARD',
          status: 'TRACKING'
        },
      },
    ];

    const premiumEdges = [
      {
        id: 'e4-5',
        source: 'skills',
        target: 'chatbot',
        animated: true,
        style: { stroke: '#8a2be2', strokeWidth: 2 },
      },
      {
        id: 'e5-6',
        source: 'chatbot',
        target: 'settings',
        animated: true,
        style: { stroke: '#8a2be2', strokeWidth: 2 },
      },
      {
        id: 'e4-7',
        source: 'contact',
        target: 'analytics',
        animated: true,
        style: { stroke: '#8a2be2', strokeWidth: 2 },
      },
      {
        id: 'e6-7',
        source: 'settings',
        target: 'analytics',
        animated: true,
        style: { stroke: '#8a2be2', strokeWidth: 2 },
      },
    ];

    setNodes((nds) => [
      ...nds.map((node) => {
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
        return node;
      }),
      ...premiumNodes,
    ]);

    setEdges((eds) => [...eds, ...premiumEdges]);
  };

  const removePremiumNodes = () => {
    setNodes((nds) => 
      nds.filter(node => !['chatbot', 'settings', 'analytics'].includes(node.id))
        .map((node) => {
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
          return node;
        })
    );

    setEdges((eds) => 
      eds.filter(edge => !['e4-5', 'e5-6', 'e4-7', 'e6-7'].includes(edge.id))
    );
  };

  const handleLogin = (userData) => {
    setUser(userData);
    addPremiumNodes(userData);
  };

  const handleLogout = () => {
    setUser(null);
    removePremiumNodes();
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
