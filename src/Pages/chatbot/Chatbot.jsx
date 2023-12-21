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
  // Fetch the token from local storage
  const token = localStorage.getItem("token");

  if (token) {
    // Connect to Socket.io server with authentication
    const newSocket = io("https://mousy-mirror-tick.glitch.me/", {
      auth: { token },
    });

    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  } else {
    console.warn("Token not available. Socket connection not established.");
  }
}, []);


  useEffect(() => {
    if (!socket) return;


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
        socket.emit("user-message", {
          room: "Hustleburg",
          message: { type: "user", text: userInput },
        });
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
