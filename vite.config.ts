import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [tsconfigPaths(), devtools(), tailwindcss(), tanstackStart(), viteReact()],
  server:{
    proxy:{
      '/api':{
        target:"http://localhost:3000",
        changeOrigins: true
      }
    }
  }
});

export default config;
