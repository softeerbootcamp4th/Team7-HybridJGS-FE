import React from "react";
import type { Preview } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/index.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <Router>
                <Story />
            </Router>
        ),
    ],
};

export default preview;
