import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "@/", replacement: "/src/" }],
    },
    plugins: [react(), svgr()],
});
