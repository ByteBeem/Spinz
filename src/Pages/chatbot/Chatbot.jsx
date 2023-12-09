import React from "react";
import "./Chatbot.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  return (
    <div className="chatbot">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="content">
        <Navbar showSidebar={showSidebar} />
        <div className="chatbot-container">
          <ul className="chat-messages">
            <li className="user-message">Hello!</li>
            <li className="bot-message">Hi there! How can I help you?</li>
            <li className="user-message">I have a question.</li>
            <li className="bot-message">Sure, ask away!</li>
            <li className="user-message">Hello!</li>
            <li className="bot-message">Hi there! How can I help you?</li>
            <li className="user-message">I have a question.</li>
            <li className="bot-message">Sure, ask away!</li>
            <li className="user-message">Hello!</li>
            <li className="bot-message">Hi there! How can I help you?</li>
            <li className="user-message">I have a question.</li>
            <li className="bot-message">Sure, ask away!</li>
            <li className="user-message">Hello!</li>
            <li className="bot-message">Hi there! How can I help you?</li>
            <li className="user-message">I have a question.</li>
            <li className="bot-message">Sure, ask away!</li>
            <li className="user-message">Hello!</li>
            <li className="bot-message">Hi there! How can I help you?</li>
            <li className="user-message">I have a question.</li>
            <li className="bot-message">Sure, ask away!</li>
            <li className="user-message">Hello!</li>
            {/* Add more messages as needed */}
          </ul>
          <div className="user-input">
            <textarea
              className="user_msg"
              placeholder="Type your message..."
            ></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
