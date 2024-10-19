import React from "react";
import Header from "./Header";
import Link from "next/link";
import { AnimatedBeamGroup } from "./AnimatedBeam/AnimatedBeamGroup";

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-black">
			<Header />
			<section className="relative pb-12 overflow-hidden sm:overflow-visible sm:pb-16 lg:pb-20 xl:pb-24">
				<div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
					<div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-16">
						<div className="max-md:text-center">
							<h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
								Find the
								<br />
								<span className="text-primary-500">
									Perfect Verse
								</span>
							</h1>
							<p className="my-4 text-base md:text-lg font-bold text-gray-400 sm:mt-8 mb-8">
								Versify is an app that helps you find Bible
								verses related to a theme.
								<br /> Type in a theme and you get similar
								verses from the Bible.
								<br /> It&apos;s like having a personal Bible study
								assistant at your fingertips.
							</p>

							<div className="relative items-center justify-center inline-flex group">
								<div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
								<Link
									href="versematch"
									className="relative inline-flex items-center justify-center capitalize px-6 py-2 text-base font-bold text-white bg-black border border-transparent rounded-full"
									role="button"
								>
									Start your search
								</Link>
							</div>
						</div>

						<div className="relative">
							<div className="absolute inset-0">
								<svg
									className="blur-3xl filter opacity-70"
									width="444"
									height="536"
									viewBox="0 0 444 536"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
										fill={`url(#c)`}
									/>
									<defs>
										<linearGradient
											id="c"
											x1="82.7339"
											y1="550.792"
											x2="-39.945"
											y2="118.965"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0%"
												style={{
													stopColor:
														"var(--color-cyan-500)",
												}}
											/>
											<stop
												offset="100%"
												style={{
													stopColor:
														"var(--color-purple-500)",
												}}
											/>
										</linearGradient>
									</defs>
								</svg>
							</div>
							<AnimatedBeamGroup />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
