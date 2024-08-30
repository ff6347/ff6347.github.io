import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	integrations: [react(), mdx()],
	site: "https://fabianmoronzirfas.me",
	markdown: {
		remarkPlugins: [
			[
				remarkToc,
				{
					heading: "Contents",
					tight: true,
					maxDepth: 3,
					ordered: false,
				},
			],
		],
		// Can be 'shiki' (default), 'prism' or false to disable highlighting
		syntaxHighlight: "prism",
		smartypants: true,
		gfm: true,
	},
});
