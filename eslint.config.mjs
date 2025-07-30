import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { off } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@typescript-eslint/recommended"),
  ...compat.config({
    extends: ['next'],
    rules: {
      '@typescript-eslint/no-unused-vars': off,
    },
  }),
];

export default eslintConfig;
