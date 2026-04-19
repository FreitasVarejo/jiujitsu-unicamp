import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "schedule-x": [
            "@schedule-x/react",
            "@schedule-x/calendar",
            "@schedule-x/theme-default",
            "@schedule-x/events-service",
            "@schedule-x/calendar-controls",
            "@schedule-x/current-time",
            "temporal-polyfill",
          ],
        },
      },
    },
  },
});
