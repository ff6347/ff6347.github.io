import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import remarkToc from "remark-toc";
// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	site: "https://fabianmoronzirfas.me",
	markdown: {
		remarkPlugins: [
			[
				remarkToc,
				{ heading: "Contents", tight: true, maxDepth: 3, ordered: false },
			],
		],
		// Can be 'shiki' (default), 'prism' or false to disable highlighting
		syntaxHighlight: "prism",
		smartypants: true,
		gfm: true,
	},
});
