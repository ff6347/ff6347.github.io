import { getCollection } from "astro:content";

export async function GET() {
	const blog = await getCollection("blog");

	const entries = blog.map((entry) => ({
		data: {
			pubDate: entry.data.pubDate,
			title: entry.data.title,
		},
	}));

	return new Response(JSON.stringify(entries), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
