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
  const [image , setImage]=useState(null);

  function handleImage(e){
    console.log(e.target.files);
    setImage(e.target.files[0])
  }

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


  function handleApi(){
    const formData=new FormData()
    formData.append('image', image)
    axios.post('https://mousy-mirror-tick.glitch.me/image', formData).then((res) =>{
      console.log(res);
    })
  }



const handleImageUpload = () => {
  if (socket) {
    const name = localStorage.getItem('user_name');
    const fileInput = document.getElementById('imageUpload');
    const imageFile = fileInput.files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Use axios to send the image to the server
      axios.post('https://mousy-mirror-tick.glitch.me/upload', formData)
        .then((response) => {
          console.log(response.data); // Log the server response
          // Handle the server response as needed

          // Assuming response.data has the image URL
          const imageUrl = response.data.imageUrl;

          // Send the image URL to the server through the socket
          socket.emit("user-message", {
            message: {
              type: 'image',
              content: imageUrl,
              name: name,
            },
          });



        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle the error as needed
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
                    message.username === socket.id
                      ? "#3498db"
                      : message.color,
                  alignSelf:
                    message.username === socket.id ? "flex-end" : "flex-start",
                }}
              >
<small>{message.username} : </small> {message.text}
              </li>
            ))}

          </ul>

          <div className="user-input">
            <div className="input-icons">
              
<label htmlFor="imageUpload" className="icon">
  <FontAwesomeIcon icon={faCamera} />


</label>


              <textarea
                className="user_msg"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
            </div>
<button style={{ marginRight: '10px' , height: '60px' , marginTop:'35px' }} onClick={handleSendMessage}>
  <FontAwesomeIcon icon={faMicrophone} />
  Voice
</button>
<button style={{ marginLeft: '10px' ,  height: '60px' , marginTop:'35px'}} onClick={handleSendMessage}>
  Send
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
