const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "eslint-comments/require-description": "off",
    "react/function-component-definition": "off",
    'import/no-extraneous-dependencies': 'off',
    "import/no-default-export": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "react/jsx-sort-props": "off",
    "import/order": "off",
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/non-nullable-type-assertion-style": 'off'
  }
};
