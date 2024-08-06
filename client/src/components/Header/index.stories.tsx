import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ScrollHeaderStyleContext } from "@/contexts/scrollHeaderStyleContext";
import Component from "./index";

const meta = {
    title: "Header",
    component: Component,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} as Meta;

export default meta;

const HeaderWrapper: React.FC<{ headerType: "light" | "dark" }> = ({ headerType }) => {
    return (
        <ScrollHeaderStyleContext.Provider
            value={{
                activeSection: "HEADLINE",
                setActiveSection: () => {},
                headerType: headerType,
                setHeaderType: () => {},
            }}
        >
            <Component />
        </ScrollHeaderStyleContext.Provider>
    );
};

export const Light: StoryFn = () => <HeaderWrapper headerType="light" />;
Light.storyName = "Light Mode";

export const Dark: StoryFn = () => <HeaderWrapper headerType="dark" />;
Dark.storyName = "Dark Mode";
