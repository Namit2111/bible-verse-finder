"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavMenu } from "@/lib/interface";

const navMenu = [
	{
		name: "About Us",
		link: "/about",
	},
	{
		name: "Verse Match",
		link: "/versematch",
	},
	{
		name: "Sign Up",
		link: "/signup",
	},
];

export default function Header() {
	const [expanded, setExpanded] = useState(false);

	return (
		<header className="py-4 sm:py-2">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex flex-wrap items-center justify-between">
					<div className="shrink-0 self-center">
						<Link href="/" title="logo">
							<Image
								className="w-auto h-auto pb-1"
								src="/images/image.png"
								alt="logo"
								width={100}
								height={100}
							/>
						</Link>
					</div>
					<div className="flex md:hidden">
						<button
							type="button"
							onClick={() => setExpanded(!expanded)}
						>
							<span aria-hidden="true">
								<Image
									className="w-7 h-7 invert"
									src="/images/menu.svg"
									alt="Menu Icon"
									width={100}
									height={100}
								/>
							</span>
						</button>
					</div>
					<nav
						className={`${expanded ? "max-md:flex max-md:flex-col max-md:basis-full max-md:pb-4 max-md:space-y-6" : "hidden"} md:ml-10 md:mr-auto md:space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start`}
					>
						<div className="flex max-md:flex-col max-md:bg-gray-900 max-md:p-3 max-md:-mt-10 max-md:rounded-md max-md:gap-2 gap-8">
							{navMenu.map((item: NavMenu, index) => (
								<Link
									key={index}
									href={item.link}
									className="text-lg font-bold text-gray-400 transition-all duration-200 hover:text-white"
								>
									{item.name}
								</Link>
							))}
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
