import React, { useEffect, useState, useRef } from "react";
import {
	differenceInDays,
	format,
	parseISO,
	startOfMonth,
	eachMonthOfInterval,
} from "date-fns";
import * as Plot from "@observablehq/plot";

const Procrastination = () => {
	const [stats, setStats] = useState<{
		medianInterval: number;
		averageInterval: number;
		postCount: number;
		totalDays: number;
		firstPost: string;
		lastPost: string;
	} | null>(null);
	const [plots, setPlots] = useState([]);
	const plotContainerRef = useRef(null);

	useEffect(() => {
		const getData = async () => {
			const response = await fetch("/api/procrastination.json");
			const blog = (await response.json()) as {
				data: { pubDate: string; title: string };
			}[];
			return blog.map((entry) => ({
				pubDate: parseISO(entry.data.pubDate),
				title: entry.data.title,
			}));
		};

		const calculateStats = async () => {
			const posts = await getData();
			posts.sort((a, b) => a.pubDate - b.pubDate);

			const intervals = posts
				.slice(1)
				.map((post, index) =>
					differenceInDays(post.pubDate, posts[index].pubDate),
				);

			const totalDays = differenceInDays(
				posts[posts.length - 1].pubDate,
				posts[0].pubDate,
			);
			const averageInterval = totalDays / (posts.length - 1);

			intervals.sort((a, b) => a - b);
			const mid = Math.floor(intervals.length / 2);
			const medianInterval =
				intervals.length % 2
					? intervals[mid]
					: (intervals[mid - 1] + intervals[mid]) / 2;
			// Generate all months between first and last post
			const allMonths = eachMonthOfInterval({
				start: posts[0].pubDate,
				end: posts[posts.length - 1].pubDate,
			});

			setStats({
				medianInterval: medianInterval.toFixed(1),
				averageInterval: averageInterval.toFixed(1),
				postCount: posts.length,
				totalDays,
				firstPost: format(posts[0].pubDate, "yyyy-MM-dd"),
				lastPost: format(posts[posts.length - 1].pubDate, "yyyy-MM-dd"),
			});

			// Create an object with all months initialized to 0
			const postsPerMonth = allMonths.reduce((acc, month) => {
				acc[format(month, "yyyy-MM")] = 0;
				return acc;
			}, {});

			// Count posts for each month
			posts.forEach((post) => {
				const monthKey = format(post.pubDate, "yyyy-MM");
				postsPerMonth[monthKey]++;
			});

			const monthlyData = Object.entries(postsPerMonth).map(
				([month, count]) => ({
					month,
					count,
				}),
			);

			const monthsWithPosts = Object.entries(postsPerMonth)
				.filter(([_, count]) => count > 0)
				.map(([month, _]) => month);

			const monthlyPlot = Plot.plot({
				title: "Posts per Month",
				x: {
					type: "band",
					label: "Month",
					tickRotate: -45,
					tickFormat: (d) => (monthsWithPosts.includes(d) ? d : ""),
					ticks: Object.keys(postsPerMonth), // Show all ticks, but only label some
				},
				y: {
					label: "Number of Posts",
					domain: [0, Math.max(...Object.values(postsPerMonth)) + 1],
				},
				marks: [
					Plot.barY(monthlyData, {
						x: "month",
						y: "count",
						fill: "tomato",
						tip: true,
					}),
					Plot.ruleY([0]),
				],
				width: 800,
				height: 400,
				marginLeft: 60,
				marginBottom: 100,
				style: {
					fontSize: "14px",
				},
			});

			setPlots([monthlyPlot]);
		};

		calculateStats();
	}, []);

	useEffect(() => {
		if (plotContainerRef.current && plots.length > 0) {
			plotContainerRef.current.innerHTML = ""; // Clear previous plots
			plots.forEach((plot) => plotContainerRef.current.appendChild(plot));
		}
	}, [plots]);

	if (!stats) return <div>Loading...</div>;

	return (
		<div>
			<h2>Procrastination Statistics</h2>
			<ul>
				<li>Total posts: {stats.postCount}</li>
				<li>
					Date range: {stats.firstPost} to {stats.lastPost}
				</li>
				<li>Total days: {stats.totalDays}</li>
				<li>Median posting interval: {stats.medianInterval} days</li>
				<li>Average posting interval: {stats.averageInterval} days</li>
			</ul>
			<div ref={plotContainerRef}></div>
			<p>I guess this is enough. Time for lunch…</p>
		</div>
	);
};

export default Procrastination;
