import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import mdx from "@astrojs/mdx";
import rehypeFigure from "@microflash/rehype-figure";

import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",
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
		rehypePlugins: [rehypeFigure],
		// Can be 'shiki' (default), 'prism' or false to disable highlighting
		syntaxHighlight: "prism",
		smartypants: true,
		gfm: true,
	},

	adapter: netlify(),

	vite: {
		plugins: [tailwindcss()],
		define: {
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV || "development",
			),
		},
		optimizeDeps: {
			include: ["react", "react-dom", "date-fns", "@observablehq/plot"],
		},
	},
});
