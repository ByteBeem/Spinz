import React, { useState, useEffect } from "react";
import "./Chatbot.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import io from "socket.io-client";

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [username, setUsername] = useState(""); // Add username state
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

    // Join the "Hustleburg" chat room
    socket.emit("join-room", "Hustleburg");

    // Fetch old messages when connecting
    socket.emit("fetch-messages", "Hustleburg");

    // Listen for old messages from the server
    socket.on("old-messages", (oldMessages) => {
      setMessages((prevMessages) => [...prevMessages, ...oldMessages]);
    });

    // Listen for messages from the server
    socket.on("chat-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Clean up on component unmount
    return () => {
      socket.off("chat-message");
      socket.off("old-messages");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      // Emit the user's message to the server with the specified room
      if (socket) {
        socket.emit("user-message", { room: "Hustleburg", message: { type: "user", text: userInput, username } });
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
                <small>{message.username}</small> {message.text}
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
