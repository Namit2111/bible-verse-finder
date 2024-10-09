"use client";

import { useState } from "react";
import VerseSearch from "./VerseSearch";
import ReactDOM from "react-dom";

// This is the landing page
//Author: Parin Acharya

export default function LandingPage() {

    const [showVerseSearch, setShowVerseSearch] = useState(false);

    const handleButtonClick = () => {
        setShowVerseSearch(true);
    };

    const handleTabClick = () => {
        setShowVerseSearch(true); // Show the VerseSearch component when the tab is clicked
    };

    return (
        <div className="bg-green-100 flex flex-col min-h-screen items-center justify-center gap-8 max-sm:m-auto">
            <div className="w-full justify-center flex mb-3">
                <h1 className="text-3xl font-bold tracking-tight text-green-500 sm:text-6xl">
                    Versify
                </h1>
            </div>

            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 w-full">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Versify</span>
                    </a>
                </div>
            </nav>

            <div className="text-center w-full">
                <h1 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                    Find similar verses in an instant. Just enter keywords.
                </h1>
            </div>

            <div className="mt-6">
                <button 
                    onClick={handleButtonClick} 
                    className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline"
                >
                    Try it now
                </button>
            </div>

            {showVerseSearch && (
                <div className="w-full min-h-screen">
                    <VerseSearch />
                </div>
            )}
        </div>
    );
}
