import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./components/App";

test("renders Teleparty Chat header", () => {
    render(<App />);
    const headerElement = screen.getByText("Teleparty Chat");
    expect(headerElement).toBeInTheDocument();
});