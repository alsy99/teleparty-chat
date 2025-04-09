// src/components/ChatRoom/MessageInput.tsx
import React from "react";

interface MessageInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
    value,
    onChange,
    onBlur,
    onSend,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type a message"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onSend}>Send</button>
        </div>
    );
};

export default MessageInput;
