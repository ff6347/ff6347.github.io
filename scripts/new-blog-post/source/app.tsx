import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import {writeFileSync} from 'fs';
import {join} from 'path';

type Step =
	| 'title'
	| 'type'
	| 'description'
	| 'tags'
	| 'categories'
	| 'published'
	| 'done';

export default function App() {
	const [step, setStep] = useState<Step>('title');
	const [title, setTitle] = useState('');
	const [fileType, setFileType] = useState<'md' | 'mdx'>('md');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState('');
	const [categories, setCategories] = useState('');

	const handleTitleSubmit = (value: string) => {
		setTitle(value);
		setStep('type');
	};

	const handleTypeSelect = (item: {label: string; value: 'md' | 'mdx'}) => {
		setFileType(item.value);
		setStep('description');
	};

	const handleDescriptionSubmit = (value: string) => {
		setDescription(value);
		setStep('tags');
	};

	const handleTagsSubmit = (value: string) => {
		setTags(value);
		setStep('categories');
	};

	const handleCategoriesSubmit = (value: string) => {
		setCategories(value);
		setStep('published');
	};

	const handlePublishedSelect = (item: {label: string; value: boolean}) => {
		createBlogPost(item.value);
		setStep('done');
	};

	const createBlogPost = (isPublished: boolean) => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const dateStr = `${year}-${month}-${day}`;

		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

		const fileName = `${dateStr}-${slug}.${fileType}`;
		const filePath = join(
			process.cwd(),
			'..',
			'..',
			'src',
			'content',
			'blog',
			fileName,
		);

		const tagsArray = tags
			? tags
					.split(',')
					.map(t => t.trim())
					.filter(t => t.length > 0)
			: [];

		const categoriesArray = categories
			? categories
					.split(',')
					.map(c => c.trim())
					.filter(c => c.length > 0)
			: [];

		const frontmatter = `---
title: "${title}"
pubDate: ${dateStr}
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
categories: [${categoriesArray.map(c => `"${c}"`).join(', ')}]
published: ${isPublished}${description ? `\ndescription: "${description}"` : ''}
---

`;

		writeFileSync(filePath, frontmatter, 'utf-8');
	};

	const typeOptions = [
		{label: 'Markdown (.md)', value: 'md' as const},
		{label: 'MDX (.mdx)', value: 'mdx' as const},
	];

	const publishedOptions = [
		{label: 'No (draft)', value: false},
		{label: 'Yes (published)', value: true},
	];

	return (
		<Box flexDirection="column" padding={1}>
			{step === 'title' && (
				<Box flexDirection="column">
					<Text>Title:</Text>
					<TextInput
						value={title}
						onChange={setTitle}
						onSubmit={handleTitleSubmit}
					/>
				</Box>
			)}

			{step === 'type' && (
				<Box flexDirection="column">
					<Text>File type:</Text>
					<SelectInput items={typeOptions} onSelect={handleTypeSelect} />
				</Box>
			)}

			{step === 'description' && (
				<Box flexDirection="column">
					<Text>Description (optional, press Enter to skip):</Text>
					<TextInput
						value={description}
						onChange={setDescription}
						onSubmit={handleDescriptionSubmit}
					/>
				</Box>
			)}

			{step === 'tags' && (
				<Box flexDirection="column">
					<Text>Tags (comma-separated, optional):</Text>
					<TextInput
						value={tags}
						onChange={setTags}
						onSubmit={handleTagsSubmit}
					/>
				</Box>
			)}

			{step === 'categories' && (
				<Box flexDirection="column">
					<Text>Categories (comma-separated, optional):</Text>
					<TextInput
						value={categories}
						onChange={setCategories}
						onSubmit={handleCategoriesSubmit}
					/>
				</Box>
			)}

			{step === 'published' && (
				<Box flexDirection="column">
					<Text>Published status:</Text>
					<SelectInput
						items={publishedOptions}
						onSelect={handlePublishedSelect}
					/>
				</Box>
			)}

			{step === 'done' && (
				<Box flexDirection="column">
					<Text color="green">✓ Blog post created successfully!</Text>
					<Text dimColor>
						Location: src/content/blog/
						{new Date().toISOString().split('T')[0]}-
						{title
							.toLowerCase()
							.replace(/[^a-z0-9]+/g, '-')
							.replace(/^-|-$/g, '')}
						.{fileType}
					</Text>
				</Box>
			)}
		</Box>
	);
}
