import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/mockData",
        "**/types",
        "**/constants",
      ],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/shared/ui"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@types": path.resolve(__dirname, "./src/shared/types"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@layouts": path.resolve(__dirname, "./src/shared/layouts"),
      "@services": path.resolve(__dirname, "./src/shared/services"),
      "@constants": path.resolve(__dirname, "./src/resources/constants"),
    },
  },
});
