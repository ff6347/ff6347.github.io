// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
	type: "content",
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
