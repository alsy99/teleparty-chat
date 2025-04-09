// src/components/ChatRoom/ChatRoom.tsx
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { ChatMessage, TypingData } from "../../utils/types";
import "./ChatRoom.css"; // Add a CSS file for styling

interface ChatRoomProps {
    messages: ChatMessage[];
    typingData: TypingData;
    onSendMessage: (message: string) => void;
    onTyping: (typing: boolean) => void;
    roomId: string;
    onExitRoom: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
    messages,
    typingData,
    onSendMessage,
    onTyping,
    roomId,
    onExitRoom,
}) => {
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage("");
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-header">
                <h2>Chat Room</h2>
                <div className="room-id">
                    <strong>Room ID:</strong> {roomId}
                </div>
                <button
                    className="leave-room-button"
                    onClick={onExitRoom}
                >
                    Leave Room
                </button>
            </div>
            <div className="message-list-container">
                <MessageList messages={messages} />
            </div>
            <div className="message-input-container">
                <MessageInput
                    value={inputMessage}
                    onChange={(e) => {
                        setInputMessage(e.target.value);
                        onTyping(true);
                    }}
                    onBlur={() => onTyping(false)}
                    onSend={handleSendMessage}
                />
                <TypingIndicator typingData={typingData} />
            </div>
        </div>
    );
};

export default ChatRoom;
