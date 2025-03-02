// src/components/ChatRoom/MessageList.tsx
import React from "react";
import { ChatMessage } from "../../utils/types";

interface MessageListProps {
    messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    {msg.userIcon && (
                        <img
                            src={msg.userIcon}
                            alt="User Icon"
                            style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />
                    )}
                    <strong>{msg.userNickname}:</strong> {msg.body}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
