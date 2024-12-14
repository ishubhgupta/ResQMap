import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./styles/Chatbot.css";
import sunImage from './assets/sun.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    // Initialize Google Generative AI
    const apiKey = process.env.REACT_APP_GEMINI_API;
    console.log("API Key:", apiKey); // Add this line to check if the API key is being loaded
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      chatRef.current = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello. Act like you are a disaster management guide. Give short answers to relevant questions. Respond with 'Question out of context' for irrelevant questions." }],
          },
          {
            role: "model",
            parts: [{ text: "Understood. Ask me anything about disaster management." }],
          },
        ],
      });

      // Send initial greeting when chatbot is toggled
      if (isChatbotVisible) {
        const initialMessage = "Hello, How can I help you with Disaster Management?";
        setMessages([{ sender: "bot", text: initialMessage }]);

        // Add greeting to chat history
        chatRef.current.history.push({
          role: "model",
          parts: [{ text: initialMessage }],
        });
      }
    } catch (error) {
      console.error("Error initializing Google Generative AI:", error);
    }
  }, [isChatbotVisible]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat window
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const chat = chatRef.current;
      if (!chat) throw new Error("Chat instance not initialized.");

      const result = await chat.sendMessageStream(input);
      let botResponse = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        botResponse += chunkText;

        // Stream partial responses
        updateMessages(botResponse);
      }

      // Replace "streaming" message with the final bot message
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.sender !== "bot-streaming"),
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error during message processing:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `An error occurred. Please try again later. Error: ${error.message}` },
      ]);
    }

    // Clear input field
    setInput("");
  };

  const updateMessages = (botResponse) => {
    setMessages((prevMessages) => [
      ...prevMessages.filter((msg) => msg.sender !== "bot-streaming"),
      { sender: "bot-streaming", text: botResponse },
    ]);
  };

  return (
    <>
      {/* Fixed Button */}
      <button
        className="chatbot-toggle-button"
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
      >
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
                {/* If the message is from the bot, show the bot image */}
                {msg.sender === "bot" && (
                  <div className="bot-image-container">
                    <img
                      src={sunImage} // Replace with actual image path or URL
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