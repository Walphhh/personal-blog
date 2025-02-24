import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "..", "server", "certificate", "key.pem")
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "..", "server", "certificate", "cert.pem")
      ),
    },
  },
});
