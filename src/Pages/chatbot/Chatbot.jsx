import React, { useState, useEffect } from "react";
import "./Chatbot.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import io from "socket.io-client";

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userColor, setUserColor] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://mousy-mirror-tick.glitch.me/");

    newSocket.on("user-color", ({ color }) => {
      setUserColor(color);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      if (socket) {
        socket.emit("user-message", {
          message: { type: "user", text: userInput },
        });
      }
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
              <li
                key={index}
                style={{
                  backgroundColor:
                    message.username === socket.id
                      ? "#3498db"
                      : message.color,
                  alignSelf:
                    message.username === socket.id ? "flex-end" : "flex-start",
                }}
              >
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
