import { render, screen } from "@testing-library/react";
import MessageList from "./MessageList";
import { ChatMessage } from "../../utils/types";

describe("MessageList Component", () => {
    const mockMessages: ChatMessage[] = [
        {
            userNickname: "Alice",
            body: "Hello!",
            isSystemMessage: false,
            permId: "1",
            timestamp: Date.now(),
            userIcon: "https://example.com/alice-icon.png",
        },
        {
            userNickname: "Bob",
            body: "Hi there!",
            isSystemMessage: false,
            permId: "2",
            timestamp: Date.now(),
        },
    ];

    it("renders a list of messages", () => {
        render(<MessageList messages={mockMessages} />);

        expect(screen.getByText("Alice:")).toBeInTheDocument();
        expect(screen.getByText("Hello!")).toBeInTheDocument();
        expect(screen.getByText("Bob:")).toBeInTheDocument();
        expect(screen.getByText("Hi there!")).toBeInTheDocument();
    });

    it("renders user icons if provided", () => {
        render(<MessageList messages={mockMessages} />);

        const userIcon = screen.getByAltText("User Icon");
        expect(userIcon).toBeInTheDocument();
        expect(userIcon).toHaveAttribute(
            "src",
            "https://example.com/alice-icon.png"
        );
    });

    it("does not render user icons if not provided", () => {
        render(<MessageList messages={mockMessages} />);

        const userIcons = screen.queryAllByAltText("User Icon");
        expect(userIcons.length).toBe(1); // Only Alice has an icon
    });

    it("renders messages in the correct order", () => {
        render(<MessageList messages={mockMessages} />);

        const messages = screen.getAllByText(/:/);
        expect(messages[0]).toHaveTextContent("Alice:");
        expect(messages[1]).toHaveTextContent("Bob:");
    });
});
