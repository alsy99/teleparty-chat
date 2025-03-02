// src/components/App.tsx
import React from "react";
import RoomControls from "./RoomControls/RoomControls";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useTelepartyClient } from "../hooks/useTelepartyClient";
import "./App.css"; // Add a CSS file for styling

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
        <div className="app-container">
            <header className="app-header">
                <h1>Teleparty Chat</h1>
            </header>
            <div className="app-content">
                {!roomId ? (
                    <RoomControls
                        onCreateRoom={createRoom}
                        onJoinRoom={joinRoom}
                    />
                ) : (
                    <ChatRoom
                        roomId={roomId}
                        messages={messages}
                        typingData={typingData}
                        onSendMessage={sendMessage}
                        onTyping={handleTyping}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
