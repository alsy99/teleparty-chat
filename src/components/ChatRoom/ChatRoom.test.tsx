import { render, screen, fireEvent } from "@testing-library/react";
import ChatRoom from "./ChatRoom";
import { ChatMessage, TypingData } from "../../utils/types";

describe("ChatRoom Component", () => {
    const mockMessages: ChatMessage[] = [
        {
            userNickname: "Alice",
            body: "Hello!",
            isSystemMessage: false,
            permId: "1",
            timestamp: new Date().getTime(),
        },
        {
            userNickname: "Bob",
            body: "Hi there!",
            isSystemMessage: false,
            permId: "2",
            timestamp: new Date().getTime(),
        },
    ];

    const mockTypingData: TypingData = {
        anyoneTyping: true,
        usersTyping: ["Alice"],
    };

    const mockOnSendMessage = jest.fn();
    const mockOnTyping = jest.fn();
    const mockOnExitRoom = jest.fn();

    it("renders the chat room header with room ID", () => {
        render(
            <ChatRoom
                messages={mockMessages}
                typingData={mockTypingData}
                onSendMessage={mockOnSendMessage}
                roomId="12345"
                onExitRoom={mockOnExitRoom}
                onTyping={mockOnTyping}
            />
        );

        expect(screen.getByText("Chat Room")).toBeInTheDocument();
        expect(screen.getByText("Room ID:")).toBeInTheDocument();
        expect(screen.getByText("12345")).toBeInTheDocument();
    });

    it("renders the list of messages", () => {
        render(
            <ChatRoom
                messages={mockMessages}
                typingData={mockTypingData}
                onSendMessage={mockOnSendMessage}
                roomId="12345"
                onExitRoom={mockOnExitRoom}
                onTyping={mockOnTyping}
            />
        );

        expect(screen.getByText("Hello!")).toBeInTheDocument();
        expect(screen.getByText("Hi there!")).toBeInTheDocument();
    });

    it("calls onSendMessage when a message is sent", () => {
        render(
            <ChatRoom
                messages={mockMessages}
                typingData={mockTypingData}
                onSendMessage={mockOnSendMessage}
                roomId="12345"
                onExitRoom={mockOnExitRoom}
                onTyping={mockOnTyping}
            />
        );

        const input = screen.getByRole("textbox");
        const sendButton = screen.getByRole("button", { name: /send/i });

        fireEvent.change(input, { target: { value: "New message" } });
        fireEvent.click(sendButton);

        expect(mockOnSendMessage).toHaveBeenCalledWith("New message");
    });

    it("calls onTyping when typing starts and stops", () => {
        render(
            <ChatRoom
                messages={mockMessages}
                typingData={mockTypingData}
                onSendMessage={mockOnSendMessage}
                roomId="12345"
                onExitRoom={mockOnExitRoom}
                onTyping={mockOnTyping}
            />
        );

        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "Typing..." } });
        expect(mockOnTyping).toHaveBeenCalledWith(true);

        fireEvent.blur(input);
        expect(mockOnTyping).toHaveBeenCalledWith(false);
    });

    it("renders the typing indicator when someone is typing", () => {
        render(
            <ChatRoom
                messages={mockMessages}
                typingData={mockTypingData}
                onSendMessage={mockOnSendMessage}
                roomId="12345"
                onExitRoom={mockOnExitRoom}
                onTyping={mockOnTyping}
            />
        );

        expect(screen.getByText("1 user(s) typing...")).toBeInTheDocument();
    });
});
