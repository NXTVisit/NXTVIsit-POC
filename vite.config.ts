// my imports
import { remixDevTools } from "remix-development-tools";

// default imports
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
    plugins: [remixDevTools({pluginDir: "./plugins",}), remix(), tsconfigPaths()],
    server: {
        open: true,
    },
	ssr: {
		noExternal: ["remix-i18next"],
	}
});
