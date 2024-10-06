import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
    // State to store user input from the form
    const [userInput, setUserInput] = useState("");
    // State to store the results returned from the API
    const [results, setResults] = useState<{ verse: string; similarity: number }[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Send user input to the Flask API
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
            } else {
                console.error('Error fetching similar verses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={cn("flex", "flex-col", "items-center", "justify-center", "min-h-screen", "p-8", "sm:p-20", "gap-8")}>  
            <h1 className={cn("text-4xl", "font-bold", "text-center", "mb-4")}>  
                Welcome to the Bible Verse Finder
            </h1>
            <p className={cn("text-lg", "text-center", "max-w-xl", "mb-6")}>  
                Discover the beauty and wisdom of Bible verses, and explore how they relate to each other. Use our similarity feature to find connections and deepen your understanding.
            </p>
            {/* Form to input a theme for similarity search */}
            <form onSubmit={handleSubmit} className={cn("flex", "flex-col", "sm:flex-row", "gap-4")}>  
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                    className={cn("p-2", "border", "border-gray-300", "rounded")}
                    placeholder="Enter a theme"
                />
                <button
                    type="submit"
                    className={cn("bg-blue-600", "text-white", "py-3", "px-6", "rounded-lg", "hover:bg-blue-700", "transition", "duration-300", "text-center")}
                >
                    Find Similar Verses
                </button>
            </form>
            {/* Display results if any are available */}
            {results.length > 0 && (
                <div className="mt-8 w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Results:</h2>
                    <ul className="list-none">
                        {results.map((result, index) => (
                            <li key={index} className="bg-white p-4 mb-4 rounded shadow">
                                <strong>Verse:</strong> {result.verse} <br />
                                <strong>Similarity:</strong> {result.similarity.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}