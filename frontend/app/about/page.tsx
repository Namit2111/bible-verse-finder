"use client";
import React, { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import { NumberTicker } from "@/components/NumberTicker";
import { getRepoDetails } from "@/lib/getRepoDetails";
import IconCloud from "@/components/ui/icon-cloud";
import { RepoData } from "@/lib/interface";

export default function About() {
	const [repoData, setRepoData] = useState<RepoData>({
		totalCommits: 1,
		totalContributors: 1,
		totalLinesOfCode: 1
	});

	useEffect(() => {
		const cachedData = sessionStorage.getItem('repoData');
		if (cachedData) {
			setRepoData(JSON.parse(cachedData));
		} else {
			fetchRepoData();
		}
	}, []);

	const fetchRepoData = async () => {
		const data = await getRepoDetails();
		setRepoData(data);
		sessionStorage.setItem('repoData', JSON.stringify(data));
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="min-h-screen bg-black">
				<Header />
				<section className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl py-8 max-md:text-center ">
					<div>
						<h1 className="text-4xl font-normal text-white max-xs:text-3xl lg:text-5xl xl:text-6xl">
							Versify Facts
						</h1>
						<div className="flex flex-wrap max-md:gap-1 gap-2 items-center max-md:justify-center">
							<p className="my-4 text-base md:text-lg font-bold text-gray-400 sm:mt-8 mb-8">
								Here are some information about our project. Support us with a{" "}
							</p>
							<p className="text-primary-500 bg-gradient-to-r from-cyan-600 to-purple-900 rounded-md text-white px-2 py-1"><a href="https://github.com/Namit2111/bible-verse-finder" target="_blank" rel="noreferrer noopener">Star ⭐️ on Github</a></p>
						</div>
					</div>
					<div className="relative max-md:overflow-hidden">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<svg className="blur-3xl opacity-70" width="95vw" height="312" viewBox="20 0 648 202" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M434.095 21.8754C619.918 21.8754 755.509 -33.413 755.509 31.8038C755.509 97.0206 268.41 201.855 82.5876 201.855C-103.234 201.855 82.5876 97.0207 82.5876 31.8039C82.5876 -33.4129 248.273 21.8754 434.095 21.8754Z" fill="url(#b)" />
								<defs>
									<linearGradient id="b" x1="0" y1="121.855" x2="8.92305" y2="-28.873" gradientUnits="userSpaceOnUse">
										<stop offset="0%" style={{ stopColor: "var(--color-cyan-500)" }}></stop>
										<stop offset="100%" style={{ stopColor: "var(--color-purple-300)" }}></stop>
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div className="flex justify-evenly items-center flex-wrap mt-32 max-md:mt-14 max-md:gap-3 mb-11">
							<div className="relative items-center justify-center md:w-2/6 w-11/12">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-s-2xl max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-12 text-white bg-black/90 border border-transparent rounded-s-2xl max-md:rounded-2xl">
									<NumberTicker value={repoData.totalContributors} className="text-4xl md:text-6xl text-white" />
									<p className="text-gray-400 my-4 max-sm:text-xs">Contributors</p>
								</div>
							</div>
							<div className="relative items-center justify-center md:w-2/6 w-11/12">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800 max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-12 text-white bg-black/90 border border-transparent max-md:rounded-2xl">
									<NumberTicker value={repoData.totalLinesOfCode} className="text-4xl md:text-6xl text-white" />
									<p className="text-gray-400 my-4 max-sm:text-xs">Lines of Code</p>
								</div>
							</div>
							<div className="relative items-center justify-center md:w-2/6 w-11/12">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800 rounded-e-2xl max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-12 text-white bg-black/90 border border-transparent rounded-e-2xl max-md:rounded-2xl">
									<NumberTicker value={repoData.totalCommits} className="text-4xl md:text-6xl text-white" />
									<p className="text-gray-400 my-4 max-sm:text-xs">Commits</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl py-8 max-md:text-center ">
					<div>
						<h1 className="text-4xl font-normal text-white max-xs:text-3xl lg:text-5xl xl:text-6xl">
							Our Techstack
						</h1>
						<div className="flex flex-wrap max-md:gap-1 gap-2 items-center max-md:justify-center">
							<p className="my-4 text-base md:text-lg font-bold text-gray-400 sm:mt-8 mb-8">
								Here are some information about the techstack we used while developing our project.
							</p>
						</div>
					</div>
					<div className="relative max-md:overflow-hidden">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<svg className="blur-3xl opacity-70" width="95vw" height="512" viewBox="20 0 648 202" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M434.095 21.8754C619.918 21.8754 755.509 -33.413 755.509 31.8038C755.509 97.0206 268.41 201.855 82.5876 201.855C-103.234 201.855 82.5876 97.0207 82.5876 31.8039C82.5876 -33.4129 248.273 21.8754 434.095 21.8754Z" fill="url(#b)" />
								<defs>
									<linearGradient id="b" x1="0" y1="121.855" x2="8.92305" y2="-28.873" gradientUnits="userSpaceOnUse">
										<stop offset="0%" style={{ stopColor: "var(--color-cyan-500)" }}></stop>
										<stop offset="100%" style={{ stopColor: "var(--color-purple-300)" }}></stop>
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div className="flex justify-evenly items-center flex-wrap mt-32 max-md:mt-14 max-md:gap-3 mb-11">
							<div className="relative items-center justify-center md:w-2/6 w-11/12">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-s-2xl max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-12 text-white bg-black/85 border border-transparent rounded-s-2xl max-md:rounded-2xl">
									<h1>Backend</h1>
									<h2>Languages & Frameworks</h2>
									<p className="text-gray-400 my-3 max-sm:text-xs">Python Flask</p>
									<h2>Python Libraries </h2>
									<p className="text-gray-400 my-1 max-sm:text-xs">Blinker Click Colorama Flask Itsdangerous</p>
									<p className="text-gray-400 my-1 max-sm:text-xs">Joblib MarkupSafe NLTK NumPy Regex</p>
									<p className="text-gray-400 my-1 max-sm:text-xs">Scikit-learn SciPy Threadpoolctl TQDM </p>
									<p className="text-gray-400 my-1 max-sm:text-xs">Pymongo Langchain_community</p>
									<p className="text-gray-400 my-1 max-sm:text-xs">Langchain_google_genai Fitz Qdrant </p>
									<p className="text-gray-400 my-1 max-sm:text-xs">Python.ENV Jinja2 GROQ Werkzeug</p>
								</div>
							</div>
							<div className="relative items-center justify-center md:w-2/6 w-11/12 ">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800 max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-13 text-black/90 bg-black/85 border border-transparent max-md:rounded-2xl">
									<IconCloud iconSlugs={[
										'tqdm', 'dotenv', 'langchain', 'numpy', 'scikit-learn',
										'scipy', 'jinja', 'json', 'nextdotjs', 'eslint', 'radixui',
										'lucide', 'postcss', 'tailwindcss', 'python', 'flask',
										'html5', 'css3', 'javascript', 'react', 'typescript', 'vercel',
									]} />
								</div>
							</div>
							<div className="relative items-center justify-center md:w-2/6 w-11/12">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800 rounded-e-2xl max-md:rounded-2xl"></div>
								<div className="relative px-8 py-6 md:py-12 text-white bg-black/85 border border-transparent rounded-e-2xl max-md:rounded-2xl ">
									<h1>Frontend</h1>
									<h2> Languages & Frameworks </h2>
									<p className="text-gray-400 my-4 max-sm:text-xs">HTML CSS Python TypeScript Next.js</p>
									<h2> Libraries & Tools </h2>
									<p className="text-gray-400 my-3 max-sm:text-xs">
										React TailwindCSS PostCSS Lucide CLSx </p>
									<p className="text-gray-400 my-3 max-sm:text-xs">
										RadixUI ESlint ESlint-config-next</p>
									<h2> Utilities </h2>
									<p className="text-gray-400 my-4 max-sm:text-xs">JSON NextResponse Vercel</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				</div>
			</Suspense>
	);
}
