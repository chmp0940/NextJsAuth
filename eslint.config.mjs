import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable specific rules
      "@typescript-eslint/no-explicit-any": "off", // Disable 'no-explicit-any'
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variable warnings
      "react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings in useEffect
    },
  },
];

export default eslintConfig;
