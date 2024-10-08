module.exports = {
	useTabs: true,
	tabWidth: 2,
	singleQuote: false,
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
