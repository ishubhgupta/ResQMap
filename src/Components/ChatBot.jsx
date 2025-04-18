import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Chatbot.css";
import sunImage from "./assets/sun.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userName, setUserName] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/user/profile", {
        withCredentials: true, // Include credentials
      })
      .then((response) => setUserName(response.data.name))
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  const sendMessageToBackend = async (message) => {
    try {
      // Send the message to the backend
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Display only the bot's response
      const botResponse = { sender: "bot", text: data.reply };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "An error occurred. Please try again later." },
      ]);
    }
  };

  const toggleChatbot = () => {
    setIsChatbotVisible((prevVisibility) => {
      const newVisibility = !prevVisibility;

      if (newVisibility && userName) {
        // Send a personalized "Hello" message to the backend when chatbot is toggled on
        const personalizedMessage = `Hello, my name is ${userName}!`;
        sendMessageToBackend(personalizedMessage);
      }
      else if (newVisibility) {
        // Send a generic "Hello" message to the backend when chatbot is toggled on
        sendMessageToBackend("Hello");
      }

      return newVisibility;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    sendMessageToBackend(input);
    setInput("");
  };

  return (
    <>
      {/* Fixed Button */}
      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        🌳
      </button>

      {/* Chatbot Window */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.sender === "bot" && (
                  <div className="bot-image-container">
                    <img
                      src={sunImage}
                      alt="Bot"
                      className="bot-image-1"
                    />
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a disaster management-related question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
