// src/hooks/useTelepartyClient.ts
import { useState, useEffect } from "react";
import {
    TelepartyClient,
    // SocketEventHandler,
    SocketMessageTypes,
} from "teleparty-websocket-lib";
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
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        const eventHandler: SocketEventHandler = {
            onConnectionReady: () => {
                console.log("WebSocket connection established");
            },
            onClose: () => {
                console.log("WebSocket connection closed");
            },
            onError: (error) => {
                console.error("WebSocket error:", error);
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

    const createRoom = async (nickname: string, userIcon?: string) => {
        if (client) {
            try {
                const roomId = await client.createChatRoom(nickname, userIcon);
                setRoomId(roomId);
                console.log("Room created with ID:", roomId);
            } catch (error) {
                console.error("Failed to create room:", error);
            }
        }
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
                console.log("Joined room with ID:", roomId);
            } catch (error) {
                console.error("Failed to join room:", error);
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
        createRoom,
        joinRoom,
        sendMessage,
        handleTyping,
    };
};
