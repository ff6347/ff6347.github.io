// ABOUTME: Test suite for tag utility functions
// ABOUTME: Tests normalization, extraction, and filtering of blog post tags
import { describe, it, expect } from 'vitest';
import type { CollectionEntry } from 'astro:content';
import { normalizeTagForUrl, getAllTags, getPostsByTag } from './tags';

// Mock CollectionEntry data for testing
function createMockPost(
	id: string,
	title: string,
	pubDate: Date,
	tags?: string[],
): CollectionEntry<'blog'> {
	return {
		id,
		slug: id,
		body: '',
		collection: 'blog',
		data: {
			title,
			pubDate,
			published: true,
			categories: [],
			tags: tags || [],
		},
	} as CollectionEntry<'blog'>;
}

describe('normalizeTagForUrl', () => {
	it('should convert spaces to hyphens', () => {
		expect(normalizeTagForUrl('Machine Learning')).toBe('machine-learning');
		expect(normalizeTagForUrl('3D print')).toBe('3d-print');
	});

	it('should convert to lowercase', () => {
		expect(normalizeTagForUrl('TypeScript')).toBe('typescript');
		expect(normalizeTagForUrl('SCREAMING')).toBe('screaming');
		expect(normalizeTagForUrl('MiXeD CaSe')).toBe('mixed-case');
	});

	it('should remove special characters', () => {
		expect(normalizeTagForUrl('C++')).toBe('c');
		expect(normalizeTagForUrl('Node.js')).toBe('nodejs');
		expect(normalizeTagForUrl('tag@#$%^&*()name')).toBe('tagname');
	});

	it('should handle multiple consecutive spaces', () => {
		expect(normalizeTagForUrl('multiple   spaces')).toBe('multiple-spaces');
		expect(normalizeTagForUrl('  leading and trailing  ')).toBe(
			'leading-and-trailing',
		);
	});

	it('should preserve numbers', () => {
		expect(normalizeTagForUrl('Web3')).toBe('web3');
		expect(normalizeTagForUrl('2023 Tech')).toBe('2023-tech');
	});

	it('should preserve existing hyphens', () => {
		expect(normalizeTagForUrl('pre-existing-hyphens')).toBe(
			'pre-existing-hyphens',
		);
	});

	it('should handle unicode characters', () => {
		expect(normalizeTagForUrl('Café')).toBe('caf');
		expect(normalizeTagForUrl('日本語')).toBe('');
	});

	it('should handle empty string', () => {
		expect(normalizeTagForUrl('')).toBe('');
	});

	it('should handle string with only special characters', () => {
		expect(normalizeTagForUrl('!@#$%')).toBe('');
	});
});

describe('getAllTags', () => {
	it('should return empty array for empty posts array', () => {
		expect(getAllTags([])).toEqual([]);
	});

	it('should handle posts with no tags', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01')),
			createMockPost('post2', 'Post 2', new Date('2024-01-02')),
		];
		expect(getAllTags(posts)).toEqual([]);
	});

	it('should extract single tag from single post', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
		];
		const result = getAllTags(posts);
		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			tag: 'TypeScript',
			slug: 'typescript',
			count: 1,
		});
	});

	it('should count multiple posts with same tag', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'TypeScript',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TypeScript',
			]),
		];
		const result = getAllTags(posts);
		expect(result).toHaveLength(1);
		expect(result[0].count).toBe(3);
	});

	it('should normalize different casings of same tag', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'typescript',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TYPESCRIPT',
			]),
		];
		const result = getAllTags(posts);
		expect(result).toHaveLength(1);
		expect(result[0].count).toBe(3);
	});

	it('should preserve original tag casing from first occurrence', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'Machine Learning',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'machine learning',
			]),
		];
		const result = getAllTags(posts);
		expect(result[0].tag).toBe('Machine Learning');
	});

	it('should extract multiple unique tags', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
				'React',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'Python',
				'Django',
			]),
		];
		const result = getAllTags(posts);
		expect(result).toHaveLength(4);
		expect(result.map((t) => t.tag)).toContain('TypeScript');
		expect(result.map((t) => t.tag)).toContain('React');
		expect(result.map((t) => t.tag)).toContain('Python');
		expect(result.map((t) => t.tag)).toContain('Django');
	});

	it('should count tags accurately across multiple posts', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
				'React',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'TypeScript',
				'Node.js',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TypeScript',
			]),
		];
		const result = getAllTags(posts);
		const tsTag = result.find((t) => t.slug === 'typescript');
		const reactTag = result.find((t) => t.slug === 'react');
		const nodeTag = result.find((t) => t.slug === 'nodejs');

		expect(tsTag?.count).toBe(3);
		expect(reactTag?.count).toBe(1);
		expect(nodeTag?.count).toBe(1);
	});

	it('should sort tags alphabetically by tag name', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'Zebra',
				'Apple',
				'Banana',
			]),
		];
		const result = getAllTags(posts);
		expect(result.map((t) => t.tag)).toEqual(['Apple', 'Banana', 'Zebra']);
	});

	it('should handle posts with undefined tags field', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), undefined),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'TypeScript',
			]),
		];
		const result = getAllTags(posts);
		expect(result).toHaveLength(1);
		expect(result[0].tag).toBe('TypeScript');
	});

	it('should generate correct slugs for all tags', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'Machine Learning',
				'3D Print',
				'Node.js',
			]),
		];
		const result = getAllTags(posts);
		expect(result[0].slug).toBe('3d-print');
		expect(result[1].slug).toBe('machine-learning');
		expect(result[2].slug).toBe('nodejs');
	});
});

describe('getPostsByTag', () => {
	it('should return empty array for empty posts array', () => {
		expect(getPostsByTag([], 'typescript')).toEqual([]);
	});

	it('should return empty array when no posts match tag', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), ['React']),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), ['Python']),
		];
		expect(getPostsByTag(posts, 'typescript')).toEqual([]);
	});

	it('should return posts matching the tag slug', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), ['React']),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TypeScript',
			]),
		];
		const result = getPostsByTag(posts, 'typescript');
		expect(result).toHaveLength(2);
		expect(result.map((p) => p.id)).toEqual(['post3', 'post1']);
	});

	it('should sort posts by date descending (newest first)', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-03-01'), [
				'TypeScript',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-02-01'), [
				'TypeScript',
			]),
		];
		const result = getPostsByTag(posts, 'typescript');
		expect(result.map((p) => p.id)).toEqual(['post2', 'post3', 'post1']);
	});

	it('should handle posts without tags field', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), undefined),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'TypeScript',
			]),
		];
		const result = getPostsByTag(posts, 'typescript');
		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('post2');
	});

	it('should match tags case-insensitively via normalization', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'typescript',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TYPESCRIPT',
			]),
		];
		const result = getPostsByTag(posts, 'typescript');
		expect(result).toHaveLength(3);
	});

	it('should match normalized tag slugs', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'Machine Learning',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'machine learning',
			]),
		];
		const result = getPostsByTag(posts, 'machine-learning');
		expect(result).toHaveLength(2);
	});

	it('should filter posts with multiple tags correctly', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
				'React',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'Python',
				'Django',
			]),
			createMockPost('post3', 'Post 3', new Date('2024-01-03'), [
				'TypeScript',
				'Node.js',
			]),
		];
		const result = getPostsByTag(posts, 'typescript');
		expect(result).toHaveLength(2);
		expect(result.map((p) => p.id)).toEqual(['post3', 'post1']);
	});

	it('should not match partial tag names', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'TypeScript',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'JavaScript',
			]),
		];
		const result = getPostsByTag(posts, 'script');
		expect(result).toHaveLength(0);
	});

	it('should handle special characters in tag matching', () => {
		const posts = [
			createMockPost('post1', 'Post 1', new Date('2024-01-01'), [
				'Node.js',
			]),
			createMockPost('post2', 'Post 2', new Date('2024-01-02'), [
				'C++',
			]),
		];
		expect(getPostsByTag(posts, 'nodejs')).toHaveLength(1);
		expect(getPostsByTag(posts, 'c')).toHaveLength(1);
	});
});
