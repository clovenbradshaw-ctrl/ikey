import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "require-await": "error",
      "@typescript-eslint/no-misused-promises": "error"
    }
  }
];
