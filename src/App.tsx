import React, { useState, useEffect } from "react";
import {
    TelepartyClient,
    SocketEventHandler,
    SocketMessageTypes,
    SessionChatMessage,
} from "teleparty-websocket-lib";

const App: React.FC = () => {
    const [client, setClient] = useState<TelepartyClient | null>(null);
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [nickname, setNickname] = useState("");
    const [roomId, setRoomId] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const eventHandler: SocketEventHandler = {
            onConnectionReady: () => {
                console.log("Connection has been established");
            },
            onClose: () => {
                console.log("Socket has been closed");
            },
            onMessage: (message) => {
                if (message.type === SocketMessageTypes.SEND_MESSAGE) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        message.data,
                    ]);
                } else if (
                    message.type === SocketMessageTypes.SET_TYPING_PRESENCE
                ) {
                    setIsTyping(message.data.anyoneTyping);
                }
            },
        };

        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);
    }, []);

    const createRoom = async () => {
        if (client && nickname) {
            const roomId = await client.createChatRoom(nickname);
            setRoomId(roomId);
        }
    };

    const joinRoom = async () => {
        if (client && nickname && roomId) {
            await client.joinChatRoom(nickname, roomId);
        }
    };

    const sendMessage = () => {
        if (client && inputMessage) {
            client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
                body: inputMessage,
            });
            setInputMessage("");
        }
    };

    const handleTyping = (typing: boolean) => {
        if (client) {
            client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
                typing,
            });
        }
    };

    return (
        <div>
            <h1>Teleparty Chat</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={createRoom}>Create Room</button>
                <input
                    type="text"
                    placeholder="Enter room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <div>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.userNickname}:</strong> {msg.body}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={inputMessage}
                    onChange={(e) => {
                        setInputMessage(e.target.value);
                        handleTyping(true);
                    }}
                    onBlur={() => handleTyping(false)}
                />
                <button onClick={sendMessage}>Send</button>
                {isTyping && <div>Someone is typing...</div>}
            </div>
        </div>
    );
};

export default App;
