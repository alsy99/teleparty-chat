import { render, screen, fireEvent } from "@testing-library/react";
import MessageInput from "./MessageInput";

describe("MessageInput Component", () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnSend = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the input field and send button", () => {
        render(
            <MessageInput
                value=""
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onSend={mockOnSend}
            />
        );

        expect(
            screen.getByPlaceholderText("Type a message")
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /send/i })
        ).toBeInTheDocument();
    });

    it("calls onChange when typing in the input field", () => {
        render(
            <MessageInput
                value=""
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onSend={mockOnSend}
            />
        );

        const input = screen.getByPlaceholderText("Type a message");
        fireEvent.change(input, { target: { value: "Hello" } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it("calls onBlur when the input field loses focus", () => {
        render(
            <MessageInput
                value=""
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onSend={mockOnSend}
            />
        );

        const input = screen.getByPlaceholderText("Type a message");
        fireEvent.blur(input);

        expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onSend when the send button is clicked", () => {
        render(
            <MessageInput
                value="Hello"
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onSend={mockOnSend}
            />
        );

        const button = screen.getByRole("button", { name: /send/i });
        fireEvent.click(button);

        expect(mockOnSend).toHaveBeenCalledTimes(1);
    });

    it("displays the correct value in the input field", () => {
        render(
            <MessageInput
                value="Test message"
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onSend={mockOnSend}
            />
        );

        const input = screen.getByPlaceholderText("Type a message");
        expect(input).toHaveValue("Test message");
    });
});
