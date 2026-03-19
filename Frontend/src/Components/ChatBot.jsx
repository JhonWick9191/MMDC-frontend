import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

// Native SVG Icons inside the component to avoid external UI libraries
export const ChatIcon = () => (
  <img src="https://pub-d5d786d675024a039884449faea17b9e.r2.dev/bot_image.png" />
);

export const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "2px" }}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");
    setIsLoading(true);

    try {
      console.log("Sending query to API:", userMsg);
      const response = await fetch("https://musicandmore.co.in/api/v1/chatBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMsg }),
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      setMessages((prev) => [...prev, { sender: "bot", rawData: data }]);
    } catch (error) {
      console.error("ChatBot Connection or Parsing Error:", error.message || error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hey there! 😊Thanks for reaching out to Music & More Tell me what you need—instrument, price, or recommendation—and I’ll help you instantly 🎵" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBotContent = (msg) => {
    if (msg.text) {
      return <div>{msg.text}</div>;
    }

    if (msg.rawData) {
      const data = msg.rawData;

      // If it's literally just a string, show it
      if (typeof data === "string") {
        return <div>{data}</div>;
      }

      // Check if success is false but maybe there's a custom error message from backend
      if (data.success === false && data.message) {
        return <div>{data.message}</div>;
      }

      // Grab typical text fields from backend if they exist
      const mainText = data.message || data.reply || data.text || "Here is what I found:";

      let productsList = [];

      // If the API directly returns an array
      if (Array.isArray(data)) {
        productsList = data;
      }
      // If the API returns `{ data: [ ... array of products ... ] }`
      else if (Array.isArray(data.data)) {
        productsList = data.data;
      }
      // Handle the strict exact requirement: { success: true, data: { name, price, quantity, stock } }
      else if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) {
        productsList = [data.data];
      }
      // If it's a paginated or nested structure: data.products
      else if (Array.isArray(data.products)) {
        productsList = data.products;
      }

      // If we didn't find any products structure but we have main text
      if (productsList.length === 0) {
        return <div>{mainText !== "Here is what I found:" ? mainText : "I couldn't identify any products in the response."}</div>;
      }

      return (
        <div>
          <div style={{ marginBottom: productsList.length > 0 ? "8px" : "0" }}>
            {mainText}
          </div>

          {productsList.length > 0 && (
            <div className="product-list">
              {productsList.map((product, index) => {
                // Read stock from the specific 'stock' field requested, with fallback
                const status = product.stock || product.stockStatus || (product.inStock !== undefined ? (product.inStock ? "In Stock" : "Out of Stock") : "N/A");

                // Color formatting
                const isOutOfStock = String(status).toLowerCase().includes("out") || status === false || status === 0;
                const isAvailable = String(status).toLowerCase().includes("in") || status === true || (typeof status === 'number' && status > 0);

                const statusColor = isOutOfStock ? "#dc2626" : (isAvailable ? "#16a34a" : "inherit");

                return (
                  <div key={index} className="product-card">
                    <h4>{product.name || product.title || product.productName || "Product"}</h4>

                    <div className="product-deatils-image-bot">
                      <img src={product.images[0]} height={100} width={100} />
                    </div>

                    <div className="overlay-on-bot" />



                    <div className="product-detail">
                      <span className="product-label">Price:</span>
                      <span className="product-value">
                        {product.price !== undefined
                          ? (typeof product.price === 'number'
                            ? `₹${product.price.toFixed(2)}`
                            : `₹${product.price}`)
                          : "N/A"}
                      </span>
                    </div>

                    {/* <div className="product-detail">
                      <span className="product-label">Quantity:</span>
                      <span className="product-value">{product.quantity !== undefined ? product.quantity : "N/A"}</span>
                    </div> */}

                    <div className="product-detail">
                      <span className="product-label">Stock Status:</span>
                      <span className="product-value" style={{ color: statusColor, fontWeight: 600 }}>
                        {typeof status === "boolean" ? (status ? "In Stock" : "Out of Stock") : status}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return <div>Unrecognized response format.</div>;
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? "visible" : "hidden"}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-title">
            <ChatIcon />
            <span>M&M Buddy</span>
          </div>
          <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close Chat">
            <CloseIcon />
          </button>
        </div>

        {/* Messages Area */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}>
              <div className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                {msg.sender === "user" ? msg.text : renderBotContent(msg)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-message-row bot-row">
              <div className="chat-bubble bot-bubble">
                <div className="loading-indicator">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} style={{ height: 1 }} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        className={`chatbot-fab ${isOpen ? "hidden" : "visible"}`}
        onClick={toggleChat}
        aria-label="Open Chat"
      >
        <ChatIcon />
      </button>
    </div>
  );
}
