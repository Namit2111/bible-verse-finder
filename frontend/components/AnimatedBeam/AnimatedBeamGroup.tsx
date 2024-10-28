"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./AnimatedBeam";

const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex size-12 sm:size-14 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className,
			)}
		>
			{children}
		</div>
	);
});

Circle.displayName = "Circle";

export const AnimatedBeamGroup = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);
	const div7Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className="relative flex h-[500px] w-full md:w-11/12 items-center justify-center overflow-hidden bg-transparent p-10"
			ref={containerRef}
		>
			<div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
				<div className="flex flex-row items-center justify-between">
					<Circle ref={div1Ref}>
						<Icons.maleTech />
					</Circle>
					<Circle ref={div5Ref}>
						<Icons.femaleTech />
					</Circle>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Circle ref={div2Ref}>
						<Icons.maleTech />
					</Circle>
					<Circle ref={div4Ref} className="size-16 sm:size-20">
						<Icons.bible />
					</Circle>
					<Circle ref={div6Ref}>
						<Icons.femaleTech />
					</Circle>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Circle ref={div3Ref}>
						<Icons.maleTech />
					</Circle>
					<Circle ref={div7Ref}>
						<Icons.femaleTech />
					</Circle>
				</div>
			</div>

			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div4Ref}
				curvature={-105}
				endYOffset={-10}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div2Ref}
				toRef={div4Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div3Ref}
				toRef={div4Ref}
				curvature={105}
				endYOffset={10}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div5Ref}
				toRef={div4Ref}
				curvature={-105}
				endYOffset={-10}
				reverse
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div4Ref}
				reverse
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div7Ref}
				toRef={div4Ref}
				curvature={105}
				endYOffset={10}
				reverse
			/>
		</div>
	);
};

const Icons = {
	bible: () => <Image src="/images/bible.svg" alt="Bible" width={100} height={100} />,
	maleTech: () => (
		<Image src="/images/man-comp.jpg" width={800} height={800} alt="male-technologist" />
	),
	femaleTech: () => (
		<Image src="/images/woman-comp.jpg" width={800} height={800} alt="female-technologist" />
	),
};
