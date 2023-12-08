import React from 'react';
import './Chatbot.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div>
      <Sidebar active={active} closeSidebar={closeSidebar} />
      <Navbar showSidebar={showSidebar} />
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
    </div>
  );
};

export default Chatbot;
