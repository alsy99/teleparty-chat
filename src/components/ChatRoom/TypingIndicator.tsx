// src/components/ChatRoom/TypingIndicator.tsx
import React from "react";
import { TypingData } from "../../utils/types";

interface TypingIndicatorProps {
    typingData: TypingData;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingData }) => {
    return (
        <div>
            {typingData.anyoneTyping && (
                <div>
                    {typingData.usersTyping.length > 0
                        ? `${typingData.usersTyping.length} user(s) typing...`
                        : "Someone is typing..."}
                </div>
            )}
        </div>
    );
};

export default TypingIndicator;
