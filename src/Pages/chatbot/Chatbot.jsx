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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.post("https://mousy-mirror-tick.glitch.me/userChat", { token })
        .then((response) => {
          const { name, messages } = response.data;

          localStorage.setItem("user_name", name);

          const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          setMessages(sortedMessages);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
          setLoading(false);
        });

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
    }
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
      const name = localStorage.getItem("user_name");

      if (userInput.startsWith('data:image')) {
        // Image message
        socket.emit("user-message", {
          message: {
            type: 'image',
            content: userInput,
            name: name,
          },
        });
      } else {
        // Text message
        socket.emit("user-message", {
          message: {
            type: 'text',
            text: userInput,
            name: name,
          },
        });
      }

      setUserInput("");
    }
  }
};



  const handleImageUpload = () => {
  if (socket) {
    const name = localStorage.getItem('user_name');
    const fileInput = document.getElementById('imageUpload');
    const imageFile = fileInput.files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Use fetch to send the image to the server
      fetch('https://mousy-mirror-tick.glitch.me/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the server response
          // Handle the server response as needed
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
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
        message.username === socket.id ? "#3498db" : message.color,
      alignSelf:
        message.username === socket.id ? "flex-end" : "flex-start",
    }}
  >
    {message.type === 'text' ? (
      <>
        <small>{message.username} : </small> {message.text}
      </>
    ) : (
      <img src={message.content} alt="user upload" />
    )}
  </li>
))}

          </ul>

          <div className="user-input">
            <div className="input-icons">
              <label htmlFor="imageUpload" className="icon">
<label htmlFor="imageUpload" className="icon">
  <FontAwesomeIcon icon={faCamera} />
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    onChange={handleImageUpload}
  />
</label>


              <textarea
                className="user_msg"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
            </div>
<button style={{ marginRight: '10px' }} onClick={handleSendMessage}>
  <FontAwesomeIcon icon={faMicrophone} />
  Voice
</button>
<button style={{ marginLeft: '10px' }} onClick={handleSendMessage}>
  Send
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
