import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context: APIContext) {
	const blog = await getCollection("blog");

	return rss({
		// `<title>` field in output xml
		title: "Fabian Morón Zirfas's Blog",
		// `<description>` field in output xml
		description:
			"Blogging or not blogging... Sometimes about stuff that involves things",
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site?.href
			? context.site.href
			: "https://fabianmoronzirfas.me",
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
		})),
	});
}
