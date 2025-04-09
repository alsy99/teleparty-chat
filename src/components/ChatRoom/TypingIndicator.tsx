// src/components/ChatRoom/TypingIndicator.tsx
import React from "react";
import { TypingData } from "../../utils/types";

interface TypingIndicatorProps {
    typingData: TypingData;
    currentUser: string; // Add currentUser prop
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
    typingData,
    currentUser,
}) => {
    // Filter out the current user from the list of users typing
    const otherUsersTyping = typingData.usersTyping.filter(
        (user) => user !== currentUser
    );

    return (
        <div>
            {typingData.anyoneTyping && otherUsersTyping.length > 0 && (
                <div>
                    {otherUsersTyping.length > 1
                        ? `${otherUsersTyping.length} user(s) typing...`
                        : `${otherUsersTyping[0]} is typing...`}
                </div>
            )}
        </div>
    );
};

export default TypingIndicator;
