import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Chatbot = ({ showSidebar, active, closeSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userColor, setUserColor] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSendPicture, setShowSendPicture] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await axios.post("https://mousy-mirror-tick.glitch.me/userChat", { token });
        const { name, messages } = response.data;

        localStorage.setItem("user_name", name);

        const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(sortedMessages);
        setLoading(false);

        const newSocket = io("https://mousy-mirror-tick.glitch.me/");

        newSocket.on("user-color", ({ color }) => {
          setUserColor(color);
        });

        newSocket.on("connect", () => {
          setLoading(false);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.error("Error initializing chat:", error);
        setLoading(false);
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("chat-message");
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      if (socket) {
        const name = localStorage.getItem("user_name");

        const messageType = userInput.startsWith("data:image") ? "image" : "text";

        socket.emit("user-message", {
          message: {
            type: messageType,
            content: userInput,
            name: name,
          },
        });

        setUserInput("");
      }
    }
  };

  const handleImageUpload = () => {
    if (socket) {
      const fileInput = document.getElementById("imageUpload");
      const imageFile = fileInput.files[0];

      if (imageFile) {
        setSelectedImage(URL.createObjectURL(imageFile));
        setShowSendPicture(true);
      } else {
        setShowSendPicture(false);
      }
    }
  };

  const handleSendImage = async () => {
    try {
      if (socket && selectedImage) {
        const name = localStorage.getItem("user_name");

        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post("https://mousy-mirror-tick.glitch.me/upload", formData);

        const imageUrl = response.data.imageUrl;
        socket.emit("user-message", {
          message: {
            type: "image",
            content: imageUrl,
            name: name,
          },
        });

        setSelectedImage(null);
        setShowSendPicture(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleVoiceNote = () => {
    // Implement voice note recording logic here
    // You may use a library like MediaRecorder to record audio
  };

  return (
    <div className="chatbot">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="content">
        <Navbar showSidebar={showSidebar} />
        <div className="chatbot-container">
          {loading && <div className="overlay">Connecting...</div>}

          <ul className="chat-messages">
            {messages.map((message, index) => (
              <li
                key={index}
                style={{
                  backgroundColor:
                    message.username === socket.id
                      ? "#3498db"
                      : message.color || userColor,
                  alignSelf:
                    message.username === socket.id ? "flex-end" : "flex-start",
                }}
              >
                <small>{message.username} : </small> {message.text}
              </li>
            ))}
          </ul>

          <div className="user-input">
            {!showSendPicture ? (
              <>
                <form action="/upload" method="post" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="imageUpload">
                    <FontAwesomeIcon icon={faCamera} />
                    <input
                      type="file"
                      id="imageUpload"
                      name="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </form>

                <textarea
                  className="user_msg"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                ></textarea>

                <button
                  style={{
                    marginLeft: "10px",
                    height: "60px",
                    marginTop: "35px",
                  }}
                  onClick={handleSendMessage}
                >
                  Send
                </button>

                <button
                  style={{
                    marginLeft: "10px",
                    height: "60px",
                    marginTop: "35px",
                  }}
                  onClick={handleVoiceNote}
                >
                  <FontAwesomeIcon icon={faMicrophone} />
                  Voice
                </button>
              </>
            ) : (
              <>
                {selectedImage && (
                  <button
                    style={{
                      marginRight: "10px",
                      height: "60px",
                      marginTop: "35px",
                    }}
                    onClick={handleSendImage}
                  >
                    Send Picture
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
