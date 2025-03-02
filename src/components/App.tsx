// src/components/App.tsx
import React from "react";
import RoomControls from "./RoomControls/RoomControls";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useTelepartyClient } from "../hooks/useTelepartyClient";

const App: React.FC = () => {
    const {
        client,
        messages,
        typingData,
        roomId,
        createRoom,
        joinRoom,
        sendMessage,
        handleTyping,
    } = useTelepartyClient();

    return (
        <div>
            <h1>Teleparty Chat</h1>
            <RoomControls onCreateRoom={createRoom} onJoinRoom={joinRoom} />
            {roomId && (
                <ChatRoom
                    messages={messages}
                    typingData={typingData}
                    onSendMessage={sendMessage}
                    onTyping={handleTyping}
                />
            )}
        </div>
    );
};

export default App;
