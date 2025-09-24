import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/api';
import { FaUser, FaRobot } from 'react-icons/fa';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');

      try {
        const response = await sendMessage(newMessages);
        const assistantMessage = { role: 'assistant', content: response.data.reply };
        
        let updatedMessages = [...newMessages, assistantMessage];
        if (updatedMessages.length > 10) {
          updatedMessages = updatedMessages.slice(updatedMessages.length - 10);
        }
        
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role}`}>
            {msg.role === 'assistant' && <FaRobot className="icon" />}
            <div className={`message ${msg.role}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && <FaUser className="icon" />}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
