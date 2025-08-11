import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
export async function GET(context: APIContext) {
	const blog = await getCollection("blog");

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkToc, {
			heading: "Contents",
			tight: true,
			maxDepth: 3,
			ordered: false,
		})
		.use(remarkRehype)
		.use(rehypeStringify);

	const items = blog.map((post) => {
		const html = String(processor.processSync(post.body));
		return {
			title: post.data.title,
			pubDate: post.data.pubDate,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
			// HTML content for feed readers
			content: html,
		};
	});

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
		items: items,
	});
}
