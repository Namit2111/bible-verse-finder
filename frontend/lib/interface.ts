import { RefObject } from "react";


export interface VerseResult {
    verse: string;
    book_name: string;
    chapter: number;
    verse_number: number;
    similarity: number;
}

export interface VerseSimilarity {
    user_input: string;
    results: VerseResult[];
}


export type NavMenu = {
	name: string;
	link: string;
};

export interface AnimatedBeamProps {
	className?: string;
	containerRef: RefObject<HTMLElement>; // Container ref
	fromRef: RefObject<HTMLElement>;
	toRef: RefObject<HTMLElement>;
	curvature?: number;
	reverse?: boolean;
	pathColor?: string;
	pathWidth?: number;
	pathOpacity?: number;
	gradientStartColor?: string;
	gradientStopColor?: string;
	delay?: number;
	duration?: number;
	startXOffset?: number;
	startYOffset?: number;
	endXOffset?: number;
	endYOffset?: number;
}

export type RepoData = {
	totalCommits: number;
	totalContributors: number;
	totalLinesOfCode: number;
};