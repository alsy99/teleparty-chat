import { render, screen } from "@testing-library/react";
import TypingIndicator from "./TypingIndicator";
import { TypingData } from "../../utils/types";

describe("TypingIndicator Component", () => {
    it("renders nothing when no one is typing", () => {
        const typingData: TypingData = {
            anyoneTyping: false,
            usersTyping: [],
        };

        render(<TypingIndicator typingData={typingData} />);

        expect(screen.queryByText(/typing/i)).not.toBeInTheDocument();
    });

    it("renders 'Someone is typing...' when anyoneTyping is true but no users are specified", () => {
        const typingData: TypingData = {
            anyoneTyping: true,
            usersTyping: [],
        };

        render(<TypingIndicator typingData={typingData} />);

        expect(screen.getByText("Someone is typing...")).toBeInTheDocument();
    });

    it("renders the correct number of users typing", () => {
        const typingData: TypingData = {
            anyoneTyping: true,
            usersTyping: ["Alice", "Bob"],
        };

        render(<TypingIndicator typingData={typingData} />);

        expect(screen.getByText("2 user(s) typing...")).toBeInTheDocument();
    });

    it("renders '1 user typing...' when only one user is typing", () => {
        const typingData: TypingData = {
            anyoneTyping: true,
            usersTyping: ["Alice"],
        };

        render(<TypingIndicator typingData={typingData} />);

        expect(screen.getByText("1 user(s) typing...")).toBeInTheDocument();
    });
});
