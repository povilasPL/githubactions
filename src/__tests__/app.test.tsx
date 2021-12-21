import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App test", () => {
    const Component: React.FC = () => <App />;

    test("should render App component", () => {
        render(<Component />);

        expect(screen.getByTestId("app")).toBeInTheDocument();
    });
});
