import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
export async function GET(context: APIContext) {
	const blog = await getCollection("blog");

	function sanitizeForFeed(source: string): string {
		// Strip Astro hydration directives like client:load / client:idle / client:visible
		// by removing attributes with a colon in the name.
		// Also strip closing tags with attributes if any remain.
		return source
			.replace(/\sclient:[a-zA-Z-]+(=\{[^}]*\}|=\"[^\"]*\"|='[^']*'|\b)/g, "")
			.replace(/\sserver:[a-zA-Z-]+(=\{[^}]*\}|=\"[^\"]*\"|='[^']*'|\b)/g, "");
	}

	function stripMdxNodes() {
		return function transformer(tree: any) {
			visit(tree, (node: any, index: number | null, parent: any) => {
				if (!parent || typeof index !== "number") return;
				// Remove ESM in MDX (imports/exports) and JSX elements, which won't render in feeds
				if (
					node.type === "mdxjsEsm" ||
					node.type === "mdxJsxFlowElement" ||
					node.type === "mdxJsxTextElement"
				) {
					parent.children.splice(index, 1);
					return [visit.SKIP, index];
				}
			});
		};
	}

	function createMarkdownProcessor() {
		return unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkToc, {
				heading: "Contents",
				tight: true,
				maxDepth: 3,
				ordered: false,
			})
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeStringify, { allowDangerousHtml: true });
	}

	function createMdxProcessor() {
		return unified()
			.use(remarkParse)
			.use(remarkMdx)
			.use(remarkGfm)
			.use(remarkToc, {
				heading: "Contents",
				tight: true,
				maxDepth: 3,
				ordered: false,
			})
			.use(stripMdxNodes)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeStringify, { allowDangerousHtml: true });
	}

	const items = blog.map((post) => {
		const sanitized = sanitizeForFeed(post.body);
		const isMdx = post.id?.toLowerCase?.().endsWith(".mdx");
		const processor = isMdx ? createMdxProcessor() : createMarkdownProcessor();
		const html = String(processor.processSync(sanitized));
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
