# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website/blog built with Astro, React, and Tailwind CSS. It's a static site hosted on Netlify that includes:

- Personal portfolio sections (work, education, projects, resume)
- Blog functionality with MDX support
- Teaching materials and resources
- RSS feed generation

## Common Development Commands

```bash
# Install dependencies
npm ci

# Development server
npm run dev
npm start  # alias for dev

# Build for production
npm run build

# Preview production build
npm run preview

# Direct Astro commands
npm run astro
```

## Code Architecture

### Content Management

- **Blog Posts**: Located in `src/content/blog/` with frontmatter schema validation
- **Content Schema**: Defined in `src/content/config.ts` using Zod for type safety
- **MDX Support**: Blog posts can use `.mdx` extension for React components

### Routing & Pages

- **File-based routing**: Pages in `src/pages/` directory
- **Dynamic routes**: Blog posts use `[...slug].astro` pattern
- **API routes**: JSON endpoints in `src/pages/api/`

### Styling

- **Tailwind CSS**: Configured via Vite plugin in `astro.config.mjs`
- **Global styles**: Located in `src/styles/`
- **Prism syntax highlighting**: Custom theme in `src/styles/prism-vs.css`

### Components

- **Astro components**: `.astro` files for server-side rendering
- **React components**: `.tsx` files with React 19 beta
- **Icons**: Custom icon components in `src/components/`

### Configuration

- **Prettier**: Uses tabs, configured for Astro files
- **TypeScript**: Strict mode with React JSX transform
- **Netlify**: Static deployment with build command in `netlify.toml`

## Important File Locations

- **Main config**: `astro.config.mjs`
- **Content types**: `src/content/config.ts`
- **Layouts**: `src/layouts/`
- **Static assets**: `public/` and `src/assets/`
- **Site URL**: https://fabianmoronzirfas.me

## Content Structure

Blog posts require frontmatter with:

- `title` (string)
- `pubDate` (date)
- `published` (boolean)
- `categories` (array of strings)
- `tags` (array of strings)

## Development Notes

- The site is built as a static site (`output: "static"`)
- Uses Netlify adapter for deployment
- Markdown includes table of contents generation
- Image assets are duplicated in both `public/` and `src/assets/` directories
