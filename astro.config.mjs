import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
	// Enable Solid to support Solid JSX components.
	integrations: [solid()],
	site: "https://fabianmoronzirfas.me",
	markdown: {
		// Can be 'shiki' (default), 'prism' or false to disable highlighting
		syntaxHighlight: "prism",
		smartypants: true,
		gfm: true,
	},
});
