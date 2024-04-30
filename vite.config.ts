// my imports
import { remixDevTools } from "remix-development-tools";

// default imports
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { routes } from "./app/remix/config";

installGlobals();

export default defineConfig({
    plugins: [remixDevTools({pluginDir: "./plugins",}), remix({routes}), tsconfigPaths()],
    server: {
        open: true,
    },
	ssr: {
		noExternal: ["remix-i18next"],
	}
});
