"use client";

import { useState } from "react";
import { VerseSimilarity } from "@/lib/interface";

export default function VerseSearch() {
    const [userInput, setUserInput] = useState("");
		const [verses, setVerses] = useState<VerseSimilarity>();
		const [error, setError] = useState<string>();

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setUserInput(e.target.value);
			setError("");
		}

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
				try {
				const response = await fetch('/api/similarity', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userInput }),
				});
	
				if (!response.ok) {
					setError('Failed to fetch data');
					return
				}
	
				const data = await response.json();
				setVerses(data);
				setUserInput("");
				setError("");
				} catch (error) {
					setError('An error occurred while fetching data');
				}					
    };

		const filteredVerses = verses && verses.results.filter((result) => result[1] > 0);
	
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-8 gap-8 max-sm:m-auto">
            <h1 className="text-2xl sm:text-4xl font-extrabold sm:font-bold text-center text-siteColor">
                Bible Verse Similarity
            </h1>
						<form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 bg-white p-8 rounded-xl shadow-xl w-full sm:w-[32rem]">
                <p className="text-xl font-bold text-gray-700">Enter a theme:</p>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => handleInputChange(e)}
										required
                    className="p-2 border border-gray-300 rounded w-full mb-8 text-lg"
								/>
								{error && <p className="text-red-500 mt-[-6px]">{error}</p>}
                <button
                    type="submit"
                    className="bg-siteColor/95 text-white py-3 px-6 w-full rounded mt-4 hover:bg-siteColor text-center text-lg max-xs:text-sm font-semibold">
                    Find Similar Verses
                </button>						
            </form>
						{/* Display results if any are available */}
						{verses && (
								<div className="flex flex-col items-center gap-4">
										<h2 className="text-xl sm:text-3xl font-bold text-gray-700">Results for "{verses.user_input}"</h2>
										{filteredVerses?.length === 0 ? (
												<p className="text-sm sm:text-xl font-bold text-gray-600 text-center">
												Your search returned void 😅, good news God's word never does! Try another search 🔎 
												</p>
										) :
												<ul className="flex flex-col gap-4 w-full sm:w-[80%] text-gray-600">
													{filteredVerses?.map((result, index) => (
															<li
																key={index}
																className="p-4 bg-white rounded-xl shadow">
																<p className="text-md font-semibold mb-2"><span className="text-siteColor font-bold">Verse:</span> 1 John {result[0]}</p>
																<p className="text-md font-semibold"><span className="text-siteColor font-bold">Similarity:</span> {result[1]}</p>
															</li>
														))
													}
												</ul>
											}
								</div>
						)}
        </div>
    );
}