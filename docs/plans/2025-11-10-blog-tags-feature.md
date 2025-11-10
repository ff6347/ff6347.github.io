# Blog Tags Feature Design

## Overview

Add build-time tag pages and tag navigation to the blog. Each unique tag gets its own page listing all posts with that tag. Tags are visible and linked in post headers and the blog index.

## Requirements

1. Dynamic tag pages - one page per unique tag, listing all posts with that tag
2. Tags overview page - shows all tags with links to their individual pages
3. Tag links in post headers - visible tags that link to their pages
4. Tag links in blog index - tags displayed inline next to each post

## Architecture

**Approach:** Utility functions pattern

Shared utility functions in `src/lib/tags.ts` provide tag operations. Pages import and use these utilities. This ensures consistent tag handling across all pages and follows existing Astro patterns in the codebase.

## URL Structure

- Individual tag pages: `/blog/tags/[tag-name]`
- Tags overview: `/blog/tags`
- Example: `/blog/tags/generative`, `/blog/tags/3d-print`

## Tag Normalization

Tags in frontmatter can contain spaces, uppercase, special characters (e.g., "3D print", "Machine Learning").

**Normalization rules:**
- Convert to lowercase
- Replace spaces with hyphens
- Keep alphanumerics and hyphens only
- Example: "3D print" → "3d-print"

This creates clean, readable URLs while maintaining original tag display text.

## Implementation Components

### 1. Utility Functions (src/lib/tags.ts)

**`getAllTags(posts: CollectionEntry<'blog'>[])`**
- Extracts all unique tags from posts collection
- Returns array of objects: `{ tag: string, slug: string, count: number }`
  - `tag`: original tag text from frontmatter
  - `slug`: normalized URL-safe version
  - `count`: number of posts with this tag
- Used for generating tag pages and overview page

**`normalizeTagForUrl(tag: string): string`**
- Converts tag string to URL-safe slug
- Used consistently everywhere tags become URLs
- Pure function, no side effects

**`getPostsByTag(posts: CollectionEntry<'blog'>[], tagSlug: string)`**
- Filters posts by normalized tag slug
- Handles reverse lookup from URL slug to original tag text
- Returns matching posts
- Used in individual tag pages to get posts for that tag

All functions use TypeScript with Astro's `CollectionEntry` type for type safety.

### 2. Individual Tag Page (src/pages/blog/tags/[tag].astro)

Uses `getStaticPaths()` for static site generation:
- Call `getAllTags()` to get all unique tags
- For each tag, call `getPostsByTag()` to get matching posts
- Return paths array with tag slug and posts data
- Render similar to blog index - list of posts sorted by date descending

Page shows:
- Tag name as heading
- List of posts with that tag (same format as blog index)
- Link back to tags overview

### 3. Tags Overview Page (src/pages/blog/tags/index.astro)

Shows all available tags:
- Call `getAllTags()` to get all unique tags
- Display as list of links to individual tag pages
- Show post count per tag for context
- Sort alphabetically by tag name

### 4. Modified Blog Index (src/pages/blog/index.astro)

Add tags inline after each post:
- For each post, access `blogPostEntry.data.tags`
- Render as small linked badges/pills
- Link each to `/blog/tags/[normalized-tag]`
- Style to match existing minimal aesthetic
- Tags appear after title/date, before description

### 5. Modified Post Layout (src/layouts/post.astro)

Add tags to post header:
- Access tags from frontmatter/props
- Render below or above the title
- Same link treatment as blog index
- Optional "Tagged:" or "Tags:" label for clarity
- Style consistently with blog index tags

## Data Flow

1. Build time: Astro calls `getStaticPaths()` in `[tag].astro`
2. `getAllTags()` extracts unique tags from all blog posts
3. For each tag, `getPostsByTag()` filters posts by that tag
4. Static pages generated at `/blog/tags/[tag-slug]`
5. Post pages and blog index import utilities to display tags with correct URLs

## Styling

- Minimal, clean design matching existing blog aesthetic
- Tags as inline elements (not block-level)
- Subtle differentiation from post titles (smaller font, lighter weight)
- Consistent styling across blog index and post headers
- Use existing CSS variables for colors

## Edge Cases

- Empty tags array: Don't render tags section
- Tags with special characters: Normalize safely, preserve original for display
- Single post with tag: Still generate tag page (valid use case)
- Case variations of same tag: Treat as separate tags (don't merge "AI" and "ai")

## Testing

- Build site and verify tag pages generated
- Check tag normalization (spaces, special chars, unicode)
- Verify post count accuracy on tags overview
- Test links from blog index and post headers to tag pages
- Verify no broken links
- Check empty/missing tags handling
