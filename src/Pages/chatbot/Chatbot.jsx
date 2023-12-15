import React, { useState, useEffect } from "react";
import "./Chatbot.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import io from "socket.io-client";

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io("https://glossy-fluorescent-ostrich.glitch.me/");
    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for messages from the server
    socket.on("chat-message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: message },
      ]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("chat-message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      // Update the local state with the user's message
      setMessages([...messages, { type: "user", text: userInput }]);

      // Emit the user's message to the server
      if (socket) {
        socket.emit("user-message", userInput);
      }

      // Clear the input field
      setUserInput("");
    }
  };

  return (
    <div className="chatbot">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="content">
        <Navbar showSidebar={showSidebar} />
        <div className="chatbot-container">
          <ul className="chat-messages">
            {messages.map((message, index) => (
              <li key={index} className={`${message.type}-message`}>
                {message.text}
              </li>
            ))}
          </ul>
          <div className="user-input">
            <textarea
              className="user_msg"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
