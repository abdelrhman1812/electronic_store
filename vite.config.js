import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/e-commerce_depi/",
  build: {
    outDir: "build",
  },
});
