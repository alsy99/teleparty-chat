// src/utils/types.ts
import {
    SessionChatMessage,
    MessageList,
    SocketMessageTypes,
} from "teleparty-websocket-lib";

export interface ChatMessage extends SessionChatMessage {
    userIcon?: string;
}

export interface TypingData {
    anyoneTyping: boolean;
    usersTyping: string[];
}

export type MessageType = {
    type: SocketMessageTypes;
    data: ChatMessage | MessageList | TypingData;
};
