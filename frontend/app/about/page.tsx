"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import { NumberTicker } from "@/components/NumberTicker";

export default function About() {

	useEffect(() => {
		console.log("about page loaded")
	})

	return (
		<div className="min-h-screen bg-black">
			<Header />
			<section className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl py-8">
				<div>
					<h1 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">
						Versify Facts
					</h1>
					<p className="my-4 text-base md:text-lg font-bold text-gray-400 sm:mt-8 mb-8">
						Here are some information about our project. Support us with a{" "}
						<span className="text-primary-500 bg-gray-500 rounded-md text-black p-1"><a href="https://github.com/Namit2111/bible-verse-finder" target="_blank" rel="noreferrer noopenner">Star ⭐️ on Github</a></span>
					</p>
				</div>
				<div className="relative">
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<svg className="blur-3xl filter opacity-70" width="756" height="202" viewBox="0 0 756 202" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M434.095 21.8754C619.918 21.8754 755.509 -33.413 755.509 31.8038C755.509 97.0206 268.41 201.855 82.5876 201.855C-103.234 201.855 82.5876 97.0207 82.5876 31.8039C82.5876 -33.4129 248.273 21.8754 434.095 21.8754Z" fill="url(#b)" />
							<defs>
								<linearGradient id="b" x1="0" y1="121.855" x2="8.92305" y2="-28.873" gradientUnits="userSpaceOnUse">
									<stop offset="0%" style={{stopColor: "var(--color-cyan-500)"}}></stop>
									<stop offset="100%" style={{ stopColor: "var(--color-purple-300)" }}></stop>
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className="flex justify-evenly items-center flex-wrap mt-32">
						<div className="relative items-center justify-center md:w-2/6 w-full">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-cyan-900 rounded-s-2xl"></div>
								<div className="relative px-8 py-12 text-white bg-black/90 border border-transparent rounded-s-2xl">
									<NumberTicker value={100000} className="text-6xl text-white" />
									<p className="text-gray-400 my-4">Contributors</p>
								</div>
						</div>
						<div className="relative items-center justify-center md:w-2/6 w-full">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800"></div>
								<div className="relative px-8 py-12 text-white bg-black/90 border border-transparent">
									<NumberTicker value={1000000} className="text-6xl text-white" />
									<p className="text-gray-400 my-4">Lines of Code</p>
								</div>	
						</div>
						<div className="relative items-center justify-center md:w-2/6 w-full">
								<div className="absolute -inset-px bg-gradient-to-r from-cyan-900 to-purple-800 rounded-e-2xl"></div>
								<div className="relative px-8 py-12 text-white bg-black/90 border border-transparent rounded-e-2xl">
									<NumberTicker value={700000} className="text-6xl text-white" />
									<p className="text-gray-400 my-4">Commits</p>
								</div>	
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}