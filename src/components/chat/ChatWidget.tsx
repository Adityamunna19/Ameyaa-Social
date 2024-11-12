import React, { useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

export function ChatWidget() {
  const [messages, setMessages] = useState<Array<{ message: string; sender: string }>>([
    {
      message: "Hello! How can I help you today?",
      sender: "system"
    }
  ]);

  const handleSend = (message: string) => {
    setMessages([...messages, { message, sender: "user" }]);
    
    // Simulate automated response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        message: "Thanks for your message! Our team will get back to you soon.",
        sender: "system"
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 shadow-xl rounded-lg overflow-hidden">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  message: msg.message,
                  sender: msg.sender,
                  direction: msg.sender === "user" ? "outgoing" : "incoming",
                  position: "single"
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}