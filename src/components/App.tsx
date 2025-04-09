// src/components/App.tsx
import React, { useEffect } from "react";
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
        nickname,
        error,
        createRoom,
        joinRoom,
        sendMessage,
        handleTyping,
        exitRoom,
    } = useTelepartyClient();

    // Redirect to the chat room if a session is restored
    useEffect(() => {
        if (roomId && nickname) {
            console.log(`Restored session for room: ${roomId}`);
        }
    }, [roomId, nickname]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Teleparty Chat</h1>
            </header>
            <div className="app-content">
                {error && (
                    <div
                        className="error-message"
                        style={{ color: "red", marginBottom: "10px" }}
                    >
                        {error}
                    </div>
                )}
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
                        onExitRoom={exitRoom}
                        nickname={nickname || ""} // Pass the current user's nickname
                    />
                )}
            </div>
        </div>
    );
};

export default App;
