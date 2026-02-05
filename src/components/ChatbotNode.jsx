import { Handle, Position } from '@xyflow/react';
import { useState, useRef, useEffect } from 'react';

function ChatbotNode({ data }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(data.isExpanded || false);
  const isLocked = !data.unlocked;
  const messagesEndRef = useRef(null);

  // Sync with data.isExpanded when it changes (e.g., on login)
  useEffect(() => {
    if (data.isExpanded !== undefined) {
      setIsExpanded(data.isExpanded);
    }
  }, [data.isExpanded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are a helpful AI assistant integrated into a cyberpunk portfolio website.' },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      const assistantMessage = result.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Groq API Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ API Error. Please add your Groq API key in Settings or check console.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleExpand = () => {
    if (!isLocked) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`node-container chatbot-node ${isLocked ? 'locked-node' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {isLocked && (
        <div className="locked-overlay">
          <div className="lock-icon">🔒</div>
          <div className="lock-message">Login with Discord to unlock</div>
        </div>
      )}
      <div className="node-header">
        <div className="node-title">
          <span className="node-icon">🤖</span>
          {data.label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="status-indicator">
            <span className={`status-dot ${isLoading ? 'loading' : 'active'}`}></span>
            {isLoading ? 'THINKING' : data.status}
          </div>
          {!isLocked && (
            <button className="expand-btn" onClick={toggleExpand}>
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="node-content">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              <div className="message-sender">
                {msg.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message assistant">
              <div className="message-sender">🤖 AI</div>
              <div className="message-content typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || isLocked}
          />
          <button 
            className="chat-send-btn" 
            onClick={sendMessage}
            disabled={isLoading || !input.trim() || isLocked}
          >
            ➤
          </button>
        </div>
      </div>
      )}
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Left} id="b" />
    </div>
  );
}

export default ChatbotNode;
