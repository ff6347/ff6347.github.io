import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [solid(), tailwind()],
  site: "https://fabianmoronzirfas.me",
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: "prism"
  }
});