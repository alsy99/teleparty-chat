// src/hooks/useTelepartyClient.ts
import { useState, useEffect } from "react";
import { TelepartyClient, SocketMessageTypes } from "teleparty-websocket-lib";
import { MessageType, ChatMessage, TypingData } from "../utils/types";

interface SocketEventHandler {
    onConnectionReady: () => void;
    onClose: () => void;
    onError: (error: any) => void;
    onMessage: (message: MessageType) => void;
}

export const useTelepartyClient = () => {
    const [client, setClient] = useState<TelepartyClient | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typingData, setTypingData] = useState<TypingData>({
        anyoneTyping: false,
        usersTyping: [],
    });
    const [roomId, setRoomId] = useState<string | null>(
        localStorage.getItem("roomId")
    );
    const [nickname, setNickname] = useState<string | null>(
        localStorage.getItem("nickname")
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const eventHandler: SocketEventHandler = {
            onConnectionReady: () => {
                console.log("WebSocket connection established");
                setError(null);
            },
            onClose: () => {
                console.log(
                    "WebSocket connection closed. Attempting to reconnect..."
                );
                reconnect();
            },
            onError: (error) => {
                console.error("WebSocket error:", error);
                setError("WebSocket connection error. Please try again.");
            },
            onMessage: (message: MessageType) => {
                console.log("Received message:", message);
                switch (message.type) {
                    case SocketMessageTypes.SEND_MESSAGE:
                        setMessages((prev) => [
                            ...prev,
                            message.data as ChatMessage,
                        ]);
                        break;
                    case SocketMessageTypes.SET_TYPING_PRESENCE:
                        setTypingData(message.data as TypingData);
                        break;
                    default:
                        console.warn("Unhandled message type:", message.type);
                        break;
                }
            },
        };

        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);

        return () => {
            newClient.teardown();
        };
    }, []);

    useEffect(() => {
        // Persist roomId and nickname in localStorage
        if (roomId) localStorage.setItem("roomId", roomId);
        if (nickname) localStorage.setItem("nickname", nickname);
    }, [roomId, nickname]);

    const reconnect = () => {
        if (client) {
            client.teardown();
        }
        const eventHandler: SocketEventHandler = {
            onConnectionReady: () => {
                console.log("Reconnected to WebSocket");
                setError(null);
            },
            onClose: () => {
                console.log("WebSocket connection closed again. Retrying...");
                setTimeout(reconnect, 5000); // Retry after 5 seconds
            },
            onError: (error) => {
                console.error("WebSocket error during reconnect:", error);
                setError("WebSocket reconnection error. Please try again.");
            },
            onMessage: (message: MessageType) => {
                console.log("Received message after reconnect:", message);
                switch (message.type) {
                    case SocketMessageTypes.SEND_MESSAGE:
                        setMessages((prev) => [
                            ...prev,
                            message.data as ChatMessage,
                        ]);
                        break;
                    case SocketMessageTypes.SET_TYPING_PRESENCE:
                        setTypingData(message.data as TypingData);
                        break;
                    default:
                        console.warn("Unhandled message type:", message.type);
                        break;
                }
            },
        };

        const newClient = new TelepartyClient(eventHandler);
        setClient(newClient);
    };

    const createRoom = async (nickname: string, userIcon?: string) => {
        if (client) {
            try {
                const roomId = await client.createChatRoom(nickname, userIcon);
                setRoomId(roomId);
                setNickname(nickname);
                console.log("Room created with ID:", roomId);
                return roomId;
            } catch (error) {
                console.error("Failed to create room:", error);
                setError("Failed to create room. Please try again.");
                return null;
            }
        }
        return roomId ?? null;
    };

    const joinRoom = async (
        nickname: string,
        roomId: string,
        userIcon?: string
    ) => {
        if (client) {
            try {
                await client.joinChatRoom(nickname, roomId, userIcon);
                setRoomId(roomId);
                setNickname(nickname);
                console.log("Joined room with ID:", roomId);
            } catch (error) {
                console.error("Failed to join room:", error);
                setError(
                    "Failed to join room. Please check the room ID and try again."
                );
            }
        }
    };

    const sendMessage = (message: string) => {
        if (client) {
            client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
                body: message,
            });
        }
    };

    const handleTyping = (typing: boolean) => {
        if (client) {
            client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
                typing,
            });
        }
    };

    return {
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
    };
};
