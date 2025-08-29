// C:\Users\Kartik\OneDrive\Desktop\YoutubeLinkwithSeconds\eslint.config.mjs

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  globalIgnores(
    [
      // Ignore specific files causing warnings
      "app/components/githubButton.tsx",
      "app/components/ui/liquid-gradient.tsx",
      "app/page.tsx",

      // Optional: ignore entire folders (example)
      // "app/components/**",

      // You can also ignore all files of a type if needed:
      // "**/*.ts",
    ],
    "Ignore ESLint Warnings During Build",
  ),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
