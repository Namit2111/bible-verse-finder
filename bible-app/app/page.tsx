"use client";

import { useState } from "react";
import { VerseSimilarity } from "@/lib/interface";

export default function Home() {
    // State to store user input from the form
    const [userInput, setUserInput] = useState("");
    // State to store the results returned from the API
    const [results, setResults] = useState<VerseSimilarity[] | string>(
        [
            {
                verse: "1 John 1:9 If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
                similarity: 0.31622776601683794
            },
            {
                verse: "1 John 1:9 If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
                similarity: 0.31622776601683794
            },
            {
                verse: "1 John 1:9 If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
                similarity: 0.31622776601683794
            },
            {
                verse: "1 John 1:9 If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
                similarity: 0.31622776601683794
            },
            {
                verse: "1 John 1:9 If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
                similarity: 0.31622776601683794
            },
        ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("I was called", userInput);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-8 sm:p-20 gap-8">
            <h1 className="text-5xl font-bold text-center text-siteColor">
                Bible Verse Similarity
            </h1>
            <div className="flex flex-col items-center gap-2 bg-white p-8 rounded-xl shadow-xl w-[32rem]">
                <p className="text-xl font-bold text-gray-700">Enter a theme:</p>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded w-full mb-8 text-lg"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-siteColor/95 text-white py-3 px-6 w-full rounded mt-4 hover:bg-siteColor text-center text-lg font-semibold">
                    Find Similar Verses
                </button>
            </div>
        {/* Display results if any are available */}
        {results?.length && (
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-700">Results for "{userInput}"</h2>
                {typeof results === "string" ? (
                    <p className="text-xl font-bold text-gray-600">
                    Your search returned void 😅, good news God's word never does! Try another search 🔎 
                    </p>
                ) :
                    <ul className="flex flex-col gap-4 w-full text-gray-600">
                        {results?.map((result, index) => (
                            <li
                                key={index}
                                className="p-4 bg-white rounded-xl shadow">
                                <p className="text-lg font-semibold mb-2"><span className="text-siteColor font-bold">Verse:</span> {result.verse}</p>
                                <p className="text-lg font-semibold"><span className="text-siteColor font-bold">Similarity:</span> {result.similarity}</p>
                            </li>
                        ))}
                    </ul>}
            </div>
        )}
        </div>


        // <div className={cn("flex", "flex-col", "items-center", "justify-center", "min-h-screen", "p-8", "sm:p-20", "gap-8")}>
        //     <h1 className={cn("text-4xl", "font-bold", "text-center", ")}>  
        //         Welcome to the Bible Verse Finder
        //     </h1>
        //     <p className={cn("text-lg", "text-center", "max-w-xl", "mb-6")}>  
        //         Discover the beauty and wisdom of Bible verses, and explore how they relate to each other. Use our similarity feature to find connections and deepen your understanding.
        //     </p>
        //     {/* Form to input a theme for similarity search */}
        //     <form onSubmit={handleSubmit} className={cn("flex", "flex-col", "sm:flex-row", "gap-4")}>  
        //         <input
        //             type="text"
        //             value={userInput}
        //             onChange={(e) => setUserInput(e.target.value)}
        //             required
        //             className={cn("p-2", "border", "border-gray-300", "rounded")}
        //             placeholder="Enter a theme"
        //         />
        //         <button
        //             type="submit"
        //             className={cn("bg-blue-600", "text-white", "py-3", "px-6", "rounded-lg", "hover:bg-blue-700", "transition", "duration-300", "text-center")}
        //         >
        //             Find Similar Verses
        //         </button>
        //     </form>
        //     {/* Display results if any are available */}
        //     {results.length > 0 && (
        //         <div className="mt-8 w-full max-w-lg">
        //             <h2 className="text-2xl font-bold text-center">Results:</h2>
        //             <ul className="list-none">
        //                 {results.map((result, index) => (
        //                     <li key={index} className="bg-white p-4 rounded shadow">
        //                         <strong>Verse:</strong> {result.verse} <br />
        //                         <strong>Similarity:</strong> {result.similarity.toFixed(2)}
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )}
        // </div>
    );
}