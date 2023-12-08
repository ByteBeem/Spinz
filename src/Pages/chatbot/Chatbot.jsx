import React from 'react';
import './Chatbot.scss';

const Chatbot = () => {
  return (
    <div className="chatbot-container">
      <ul className="chat-messages">
        <li className="user-message">Hello!</li>
        <li className="bot-message">Hi there! How can I help you?</li>
        <li className="user-message">I have a question.</li>
        <li className="bot-message">Sure, ask away!</li>
        {/* Add more messages as needed */}
      </ul>
      <div className="user-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
