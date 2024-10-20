"use client";
import { useState } from "react";
import { VerseSimilarity } from "@/lib/interface";
import { RainbowButton } from "@/components/rainbow-button";
import { Copy, Check } from 'lucide-react';
import Header from "../../components/Header";

function decimalToPercentage(decimal: number): string {
    return (decimal * 100).toFixed(1) + '%';
}

export default function VerseSearch() {
  const [userInput, setUserInput] = useState("");
  const [verses, setVerses] = useState<VerseSimilarity>();
  const [error, setError] = useState<string>();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [display, setDisplay] = useState<number>(5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/similarity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      if (!response.ok) {
        setError("Failed to fetch data");
        return;
      }
      const data = await response.json();
      setVerses(data);
      setDisplay(5);
      setUserInput("");
      setError("");
    } catch {
      setError("An error occurred while fetching data");
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };

  function handleLoadMore() {
    setDisplay(prevDisplay => Math.min(prevDisplay + 5, 20));
  }

  const filteredVerses =
    verses && verses.results.filter((result) => result[1] > 0);

  const showLoadMore = filteredVerses && filteredVerses.length > display && display < 20;

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex flex-col items-center justify-center mt-20 gap-8 max-sm:m-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold sm:font-bold text-center text-siteColor">
          Verse Match
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 bg-white p-8 pb-3 rounded-xl shadow-xl w-full sm:w-[32rem]"
        >
          <p className="text-xl font-bold text-gray-700">Enter a theme:</p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInputChange(e)}
            required
            className="p-2 border border-gray-300 rounded w-full mb-6 text-lg"
          />
          {error && <p className="text-red-500 mt-[-6px]">{error}</p>}
          <RainbowButton type="submit" className="w-full mb-6 hover:opacity-95">
            Find Similar Verses
          </RainbowButton>
        </form>
        {verses && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl sm:text-3xl font-bold text-white-700">
              Results for &quot;{verses.user_input}&quot;
            </h2>
            {filteredVerses?.length === 0 ? (
              <p className="text-sm sm:text-xl font-bold text-white-600 text-center">
                Your search returned void 😅, good news God&apos;s word never
                does! Try another search 🔎
              </p>
            ) : (
              <>
                <ul className="flex flex-col gap-4 w-full sm:w-[80%] text-gray-600">
                  {filteredVerses?.slice(0, display)?.map((result, index) => (
                    <li key={index} className="p-4 bg-white rounded-xl shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-md font-semibold mb-2">
                            <span className="text-siteColor font-bold">Verse:</span> 1
                            John {result[0]}
                          </p>
                          <p className="text-md font-semibold">
                            <span className="text-siteColor font-bold">
                              Similarity:
                            </span>{" "}
                            {decimalToPercentage(result[1])}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(`1 John ${result[0]} - Similarity: ${decimalToPercentage(result[1])}`, index)}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Copy to clipboard"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {showLoadMore && (
                  <button 
                    onClick={handleLoadMore} 
                    className="border-solid bg-siteColor m-[10px] p-[10px] text-stone-50 rounded-md hover:opacity-90 transition-colors"
                  >
                    See More
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}