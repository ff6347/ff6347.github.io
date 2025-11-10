# Blog Tags Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add build-time tag pages and tag navigation to blog posts, allowing readers to browse posts by tag.

**Architecture:** Utility functions pattern - shared functions in `src/lib/tags.ts` provide tag operations (extraction, normalization, filtering). Pages import these utilities for consistent tag handling. Dynamic routing via Astro's `getStaticPaths()` generates static pages for each tag at build time.

**Tech Stack:** Astro 5, TypeScript, static site generation

---

## Task 1: Create Tag Utility Functions

**Files:**
- Create: `src/lib/tags.ts`

**Step 1: Create tags utility file with type imports**

Create `src/lib/tags.ts`:

```typescript
// ABOUTME: Tag utility functions for blog posts
// ABOUTME: Provides tag extraction, normalization, and filtering
import type { CollectionEntry } from "astro:content";

export interface TagInfo {
	tag: string;      // Original tag text from frontmatter
	slug: string;     // URL-safe normalized version
	count: number;    // Number of posts with this tag
}
```

**Step 2: Implement normalizeTagForUrl function**

Add to `src/lib/tags.ts`:

```typescript
/**
 * Converts tag string to URL-safe slug
 * Examples: "3D print" -> "3d-print", "Machine Learning" -> "machine-learning"
 */
export function normalizeTagForUrl(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}
```

**Step 3: Implement getAllTags function**

Add to `src/lib/tags.ts`:

```typescript
/**
 * Extracts all unique tags from posts collection
 * Returns array sorted alphabetically by tag name
 */
export function getAllTags(
	posts: CollectionEntry<"blog">[],
): TagInfo[] {
	const tagMap = new Map<string, { tag: string; count: number }>();

	for (const post of posts) {
		if (!post.data.tags) continue;

		for (const tag of post.data.tags) {
			const slug = normalizeTagForUrl(tag);
			const existing = tagMap.get(slug);

			if (existing) {
				existing.count++;
			} else {
				tagMap.set(slug, { tag, count: 1 });
			}
		}
	}

	return Array.from(tagMap.entries())
		.map(([slug, { tag, count }]) => ({ tag, slug, count }))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}
```

**Step 4: Implement getPostsByTag function**

Add to `src/lib/tags.ts`:

```typescript
/**
 * Filters posts by normalized tag slug
 * Returns posts sorted by date descending (newest first)
 */
export function getPostsByTag(
	posts: CollectionEntry<"blog">[],
	tagSlug: string,
): CollectionEntry<"blog">[] {
	return posts
		.filter((post) => {
			if (!post.data.tags) return false;
			return post.data.tags.some(
				(tag) => normalizeTagForUrl(tag) === tagSlug,
			);
		})
		.sort((a, b) => {
			const dateA = new Date(a.data.pubDate);
			const dateB = new Date(b.data.pubDate);
			return dateB.getTime() - dateA.getTime();
		});
}
```

**Step 5: Verify TypeScript compilation**

Run: `pnpm run build`

Expected: Build succeeds with no TypeScript errors in tags.ts

**Step 6: Commit utility functions**

```bash
git add src/lib/tags.ts
git commit -m "feat(tags): add tag utility functions"
```

---

## Task 2: Create Individual Tag Pages

**Files:**
- Create: `src/pages/blog/tags/[tag].astro`

**Step 1: Create tag page with getStaticPaths**

Create `src/pages/blog/tags/[tag].astro`:

```astro
---
import Layout from "../../../layouts/standard.astro";
import { getCollection } from "astro:content";
import { getAllTags, getPostsByTag } from "../../../lib/tags";

export async function getStaticPaths() {
	const blog = await getCollection("blog");
	const isDev = import.meta.env.DEV;
	const publishedPosts = blog.filter(
		(post) => isDev || post.data.published,
	);

	const allTags = getAllTags(publishedPosts);

	return allTags.map((tagInfo) => ({
		params: { tag: tagInfo.slug },
		props: {
			tag: tagInfo.tag,
			posts: getPostsByTag(publishedPosts, tagInfo.slug),
		},
	}));
}

const { tag, posts } = Astro.props;
---

<Layout title={`Posts tagged "${tag}"`}>
	<h1>Posts tagged "{tag}"</h1>
	<p class="tag-meta">
		{posts.length} {posts.length === 1 ? "post" : "posts"}
	</p>

	<ul class="blog-list">
		{
			posts.map((post) => (
				<li class="blog-item">
					<div class="blog-item-required">
						<time
							datetime={post.data.pubDate.toISOString()}
							class="blog-date"
						>
							{post.data.pubDate.toISOString().split("T")[0]}
						</time>
						<a href={`/blog/${post.slug}`} class="blog-title">
							{post.data.title}
						</a>
					</div>
					{post.data.description && (
						<p class="blog-item-description">
							{post.data.description}
						</p>
					)}
				</li>
			))
		}
	</ul>

	<p class="back-link">
		<a href="/blog/tags">← All tags</a>
	</p>
</Layout>

<style>
	.tag-meta {
		color: var(--text-color-light);
		margin: 0.5rem 0 1.5rem 0;
	}

	.blog-list {
		list-style: none;
	}

	.blog-item {
		display: flex;
		align-items: baseline;
		flex-direction: column;
	}

	.blog-item-required {
		align-items: baseline;
		position: relative;
	}

	.blog-item::before {
		content: none;
	}

	.blog-item-required::before {
		content: "> ";
		margin-left: -1rem;
		font-size: 0.8rem;
		position: relative;
		top: -0.1em;
		padding-right: 0.3rem;
	}

	.blog-date {
		flex-shrink: 0;
		margin-right: 0.5rem;
		text-decoration-thickness: 0.06em;
		text-underline-offset: 0.1em;
		text-decoration: underline;
	}

	.blog-title {
		flex-grow: 1;
	}

	.blog-item-description {
		margin: 0.2rem 0 1rem 0;
		color: var(--text-color-light);
		font-style: italic;
	}

	.back-link {
		margin-top: 2rem;
	}
</style>
```

**Step 2: Build and verify tag pages generated**

Run: `pnpm run build`

Expected: Build succeeds, output shows routes like `/blog/tags/music/index.html`, `/blog/tags/generative/index.html`

**Step 3: Preview site and test tag page**

Run: `pnpm run preview`

Navigate to: `http://localhost:4321/blog/tags/music`

Expected: Page displays posts tagged "music", sorted by date descending

**Step 4: Commit tag pages**

```bash
git add src/pages/blog/tags/\[tag\].astro
git commit -m "feat(tags): add individual tag pages"
```

---

## Task 3: Create Tags Overview Page

**Files:**
- Create: `src/pages/blog/tags/index.astro`

**Step 1: Create tags overview page**

Create `src/pages/blog/tags/index.astro`:

```astro
---
import Layout from "../../../layouts/standard.astro";
import { getCollection } from "astro:content";
import { getAllTags } from "../../../lib/tags";

const blog = await getCollection("blog");
const isDev = import.meta.env.DEV;
const publishedPosts = blog.filter((post) => isDev || post.data.published);

const allTags = getAllTags(publishedPosts);
---

<Layout title="All Tags">
	<h1>All Tags</h1>
	<p class="tag-count">
		{allTags.length} {allTags.length === 1 ? "tag" : "tags"}
	</p>

	<ul class="tags-list">
		{
			allTags.map((tagInfo) => (
				<li class="tag-item">
					<a href={`/blog/tags/${tagInfo.slug}`} class="tag-link">
						{tagInfo.tag}
					</a>
					<span class="tag-count-badge">({tagInfo.count})</span>
				</li>
			))
		}
	</ul>

	<p class="back-link">
		<a href="/blog">← Back to blog</a>
	</p>
</Layout>

<style>
	.tag-count {
		color: var(--text-color-light);
		margin: 0.5rem 0 1.5rem 0;
	}

	.tags-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.tag-item {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
	}

	.tag-item::before {
		content: none;
	}

	.tag-link {
		text-decoration: underline;
	}

	.tag-count-badge {
		font-size: 0.85em;
		color: var(--text-color-light);
	}

	.back-link {
		margin-top: 2rem;
	}
</style>
```

**Step 2: Build and verify tags overview page**

Run: `pnpm run build`

Expected: Build succeeds, output shows `/blog/tags/index.html`

**Step 3: Preview and test tags overview**

Run: `pnpm run preview` (if not already running)

Navigate to: `http://localhost:4321/blog/tags`

Expected: Page displays all tags alphabetically with post counts, links work

**Step 4: Commit tags overview**

```bash
git add src/pages/blog/tags/index.astro
git commit -m "feat(tags): add tags overview page"
```

---

## Task 4: Add Tags to Blog Index

**Files:**
- Modify: `src/pages/blog/index.astro`

**Step 1: Import tag utility**

In `src/pages/blog/index.astro`, add after existing imports (around line 3):

```typescript
import { normalizeTagForUrl } from "../../lib/tags";
```

**Step 2: Add tags display in blog list**

Find the blog item map (around line 30-48) and modify the structure to add tags after the title.

Replace the `<li class="blog-item">` section with:

```typescript
<li class="blog-item">
	<div class="blog-item-required">
		<time
			datetime={blogPostEntry.data.pubDate.toISOString()}
			class="blog-date"
		>
			{blogPostEntry.data.pubDate.toISOString().split("T")[0]}
		</time>
		<a href={`/blog/${blogPostEntry.slug}`} class="blog-title">
			{blogPostEntry.data.title}
		</a>
	</div>
	{blogPostEntry.data.tags && blogPostEntry.data.tags.length > 0 && (
		<div class="blog-tags">
			{blogPostEntry.data.tags.map((tag) => (
				<a
					href={`/blog/tags/${normalizeTagForUrl(tag)}`}
					class="tag-badge"
				>
					{tag}
				</a>
			))}
		</div>
	)}
	{blogPostEntry.data.description && (
		<p class="blog-item-description">
			{blogPostEntry.data.description}
		</p>
	)}
</li>
```

**Step 3: Add tag styles**

In the `<style>` section of `src/pages/blog/index.astro`, add before the closing `</style>`:

```css
.blog-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 0.3rem 0 0 0;
	font-size: 0.85em;
}

.tag-badge {
	padding: 0.1rem 0.4rem;
	background: var(--bg-color-secondary, #f5f5f5);
	border-radius: 3px;
	text-decoration: none;
	color: var(--text-color-light);
}

.tag-badge:hover {
	text-decoration: underline;
}
```

**Step 4: Build and verify blog index**

Run: `pnpm run build`

Expected: Build succeeds, no errors

**Step 5: Preview and test blog index tags**

Run: `pnpm run preview`

Navigate to: `http://localhost:4321/blog`

Expected: Tags appear below each post title, clicking tag navigates to tag page

**Step 6: Commit blog index changes**

```bash
git add src/pages/blog/index.astro
git commit -m "feat(tags): add tag badges to blog index"
```

---

## Task 5: Add Tags to Post Headers

**Files:**
- Modify: `src/layouts/post.astro`

**Step 1: Read current post layout**

First, check what data is available in the post layout. The current layout is minimal.

We need to access the frontmatter data. In Astro, when using content collections, the frontmatter is passed via props.

**Step 2: Update post layout with tags**

Replace the entire contents of `src/layouts/post.astro` with:

```astro
---
import Layout from "./standard.astro";
import { normalizeTagForUrl } from "../lib/tags";

const { title, tags } = Astro.props.frontmatter || Astro.props;
---

<Layout title={title}>
	{tags && tags.length > 0 && (
		<div class="post-tags">
			<span class="tags-label">Tagged:</span>
			{tags.map((tag: string) => (
				<a
					href={`/blog/tags/${normalizeTagForUrl(tag)}`}
					class="tag-badge"
				>
					{tag}
				</a>
			))}
		</div>
	)}
	<slot />
</Layout>

<style>
	.post-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem;
		margin: 0 0 1.5rem 0;
		font-size: 0.9em;
	}

	.tags-label {
		color: var(--text-color-light);
		font-weight: normal;
	}

	.tag-badge {
		padding: 0.1rem 0.4rem;
		background: var(--bg-color-secondary, #f5f5f5);
		border-radius: 3px;
		text-decoration: none;
		color: var(--text-color-light);
	}

	.tag-badge:hover {
		text-decoration: underline;
	}
</style>
```

**Step 3: Build and verify post layout**

Run: `pnpm run build`

Expected: Build succeeds, no errors

**Step 4: Preview and test post tags**

Run: `pnpm run preview`

Navigate to: `http://localhost:4321/blog/2025-11-10-marble-fountain`

Expected: Tags appear at top of post, clicking tag navigates to tag page

**Step 5: Commit post layout changes**

```bash
git add src/layouts/post.astro
git commit -m "feat(tags): add tag badges to post headers"
```

---

## Task 6: Final Verification

**Step 1: Clean build**

```bash
rm -rf dist .astro
pnpm run build
```

Expected: Clean build succeeds, all tag pages generated

**Step 2: Manual testing checklist**

Run: `pnpm run preview`

Test these scenarios:
- [ ] `/blog/tags` shows all tags with counts
- [ ] Clicking tag from overview navigates to tag page
- [ ] Tag page shows correct posts for that tag
- [ ] Blog index shows tags for each post
- [ ] Clicking tag from blog index navigates to tag page
- [ ] Individual post shows tags at top
- [ ] Clicking tag from post navigates to tag page
- [ ] Tag normalization works (spaces → hyphens, lowercase)
- [ ] Tags with special characters display correctly

**Step 3: Check build output**

Run: `ls dist/blog/tags/`

Expected: Directory contains index.html and subdirectory for each tag

**Step 4: Final commit**

If any adjustments were needed during testing:

```bash
git add -A
git commit -m "fix(tags): final adjustments from testing"
```

**Step 5: Create summary**

Document completion:
- Tag utility functions: ✓
- Individual tag pages: ✓
- Tags overview page: ✓
- Blog index tags: ✓
- Post header tags: ✓
- Build verification: ✓

---

## Notes for Engineer

**File structure created:**
```
src/
├── lib/
│   └── tags.ts              (new)
├── pages/
│   └── blog/
│       └── tags/
│           ├── [tag].astro  (new)
│           └── index.astro  (new)
├── pages/blog/
│   └── index.astro          (modified)
└── layouts/
    └── post.astro           (modified)
```

**Key patterns:**
- Tag normalization is consistent across all pages via `normalizeTagForUrl()`
- Always filter for published posts (respect `published` flag and dev mode)
- Maintain existing blog list styling for consistency
- Tags are optional - handle missing/empty tags array gracefully

**CSS variables used:**
- `--text-color-light` - for subtle text
- `--bg-color-secondary` - for tag badges (fallback to #f5f5f5)

**Testing approach:**
Since no test framework exists, use build verification and manual testing. The build will catch TypeScript errors and routing issues. Manual testing verifies user experience.
