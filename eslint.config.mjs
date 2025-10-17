import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: [".next/**", "node_modules/**"] },
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ),
];
export default config;

