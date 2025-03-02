// src/components/ChatRoom/ChatRoom.tsx
import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { ChatMessage, TypingData } from "../../utils/types";

interface ChatRoomProps {
    messages: ChatMessage[];
    typingData: TypingData;
    onSendMessage: (message: string) => void;
    onTyping: (typing: boolean) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
    messages,
    typingData,
    onSendMessage,
    onTyping,
}) => {
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage("");
        }
    };

    return (
        <div>
            <MessageList messages={messages} />
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
    );
};

export default ChatRoom;
