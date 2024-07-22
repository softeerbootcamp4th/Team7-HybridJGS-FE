module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["node_modules/", "dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: [
        "react",
        "react-hooks",
        "react-refresh",
        "@typescript-eslint",
        "@typescript-eslint/eslint-plugin",
        "prettier",
    ],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/ban-ts-comment": "off",
        "prettier/prettier": ["error"],
    },
};
