
import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div className={`message-bubble ${isUser ? "user-message" : "bot-message"}`}>
      <p className="text-sm md:text-base">{message}</p>
    </div>
  );
};

export default ChatMessage;
