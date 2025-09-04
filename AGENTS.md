# AGENTS.md

This file provides guidance to Coding Agents when working with code in this repository.

## Development Commands

- `npm run dev` or `npm start`: Start Astro development server
- `npm run build`: Build the static site for production
- `npm run preview`: Preview the built site locally
- `npm run lint`: Run ESLint to check for code issues
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Format code with Prettier

## Project Architecture

This is a personal website built with **Astro 5** and deployed on **Netlify**. The architecture follows Astro's conventions:

### Key Technologies
- **Astro**: Static site generator with React integration
- **React 19**: For interactive components
- **TailwindCSS 4**: For styling via Vite plugin
- **MDX**: For blog posts with embedded React components
- **TypeScript**: Type safety throughout

### Directory Structure
- `src/pages/`: File-based routing (index.astro, blog/[...slug].astro)
- `src/content/blog/`: Markdown blog posts with frontmatter schema
- `src/layouts/`: Reusable page layouts (standard.astro, post.astro)
- `src/components/`: React/Astro components including icon components
- `src/assets/images/`: Static images organized by category

### Content Management
Blog posts use Astro Content Collections with a defined schema:
- Required: `title`, `pubDate`, `published`, `categories`, `tags`
- Optional: `description`
- Posts are written in Markdown/MDX format

### Configuration Details
- Site URL: `https://fabianmoronzirfas.me`
- Output: Static site generation
- Markdown: Uses Prism syntax highlighting, remark-toc for table of contents
- Integrations: React, MDX, Netlify adapter
- Vite optimizations for React, date-fns, Observable Plot

### Development Patterns
- Icon components follow `icon-[name].tsx` naming convention
- Uses unified/remark ecosystem for markdown processing
- TailwindCSS configured through Vite plugin rather than PostCSS. Use tailwind sparsely. Prefer global styles	 in `src/styles/styles.css` or local styles in .astro files if possible.
