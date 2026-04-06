// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
// Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	// type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		updateDate: z.date().optional(),
		published: z.boolean(),
		categories: z.array(z.string()),
		tags: z.array(z.string()),
		description: z.string().optional(),
	}),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
	blog: blogCollection,
};
