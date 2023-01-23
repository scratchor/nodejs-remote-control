module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        ecmaVersion: "latest", // Allows the use of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        project: './tsconfig.json'
    },
    extends: ["airbnb", "airbnb-typescript/base", "plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
    env: {
        node: true, // Enable Node.js global variables
    },
    rules: {
        'max-len': ['error', {"code": 120}],
        'no-console': 'warn',
        'import/prefer-default-export': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"]
    },
};
