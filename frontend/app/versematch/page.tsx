"use client";
import { useState } from "react";
import { VerseSimilarity } from "@/lib/interface";
import { RainbowButton } from "@/components/rainbow-button";
import { AnimatedGradientText } from "@/components/AnimatedGradientText";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";
import Header from "../../components/Header";
// import { StyledWrapper } from "@/components/pattern";

function decimalToPercentage(decimal: number): string {
  return (decimal * 100).toFixed(1) + "%";
}

function generateSharingLink(platform: string, scriptureText: string, scriptureURL: string): string {
  const encodedText = encodeURIComponent(scriptureText);
  const encodedURL = encodeURIComponent(scriptureURL); 

  switch (platform) {
    case "X": 
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`; 
    case "Threads": 
      return `https://www.threads.net`; //Thread does not support direct URl sharing
    case "Pinterest":
      return `https://pinterest.com/pin/create/button/?description=${encodedText}&url=${encodedURL}`;
      case "Instagram":
        return `https://instagram.com`; //Instagram does not support direct URL sharing
    default: 
      throw new Error("Unsupported platform"); 
    }
}

export default function VerseSearch() {
  const [userInput, setUserInput] = useState("");
  const [verses, setVerses] = useState<VerseSimilarity>();
  const [error, setError] = useState<string>();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [shareMenuIndex, setShareMenuIndex] = useState<number | null>(null);
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

  const toggleMenu = (index: number) => {
    setMenuIndex(menuIndex === index ? null : index);
  };

  
  const toggleShareMenu = (index: number) => {
   setShareMenuIndex(shareMenuIndex === index ? null : index);
  };

  function handleLoadMore() {
    setDisplay((prevDisplay) => Math.min(prevDisplay + 5, 20));
  }

  const filteredVerses =
    verses && verses.results.filter((result) => result.similarity > 0);

  const showLoadMore =
    filteredVerses && filteredVerses.length > display && display < 20;
  return (
    // <StyledWrapper>
    //   <div className="container min-h-screen">
    <div className="min-h-screen bg-gradient-to-b from-black to-orange-300">
      <Header />
      <div className="flex flex-col items-center justify-center mt-20 gap-8 max-sm:m-auto">
        <AnimatedGradientText className="text-2xl sm:text-4xl font-extrabold sm:font-bold text-center">
          <span
            className={cn(
              "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:400%_100%] bg-clip-text text-transparent"
            )}
          >
            Verse Match
          </span>
        </AnimatedGradientText>
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
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              Results for &quot;{verses.user_input}&quot;
            </h2>
            {filteredVerses?.length === 0 ? (
              <p className="text-sm sm:text-xl font-bold text-gray-400 text-center">
                Your search returned void 😅, good news God&apos;s word never
                does! Try another search 🔎
              </p>
            ) : (
              <>
                <ul className="flex flex-col gap-4 w-full sm:w-[80%] text-gray-600">
                  {filteredVerses?.slice(0, display)?.map((result, index) => (
                    <li
                      key={index}
                      className="p-4 bg-white rounded-xl shadow relative"
                    >
                      <div className="flex justify-between items-start">
                          <p className="text-md font-semibold mb-2">
                            <span className="text-siteColor font-bold"> </span>
                            {result.book_name} {result.chapter}:
                            {result.verse_number} - {result.verse}
                          </p>
                          <p className="text-md font-semibold">
                            <span className="text-siteColor font-bold">
                              Similarity:
                            </span>{" "}
                            {decimalToPercentage(result.similarity)}
                          </p>
                        </div>
                        {/* Menu */}
                        <button
                          onClick={() => toggleMenu(index)}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors absolute top-0 right-8"
                          aria-label="More options"
                        >
                          <IoIosMore className="w-5 h-5" />
                        </button>
                        {menuIndex === index && (
                          <div className="absolute top-0 right-0 bg-white shadow-md rounded-md p-1 flex flex-col items-end">
                            {}
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  `${result.book_name} ${result.chapter}:${
                                    result.verse_number
                                  } ${
                                    result.verse
                                  } - Similarity: ${decimalToPercentage(
                                    result.similarity
                                  )}`,
                                  index
                                )
                              }
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                              aria-label="Copy to clipboard"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>

                            {/* Share Button */}
                            <button
                              onClick={() => toggleShareMenu(index)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                              style={{display: 'flex', alignItems: 'center'}}
                              aria-label="Share options"
                            >
                              <IoIosShareAlt className="w-5 h-5" />
                            </button>

                            {/* Share Sub-Menu */}
                            {shareMenuIndex === index && (
                              <div className="absolute bg-white shadow-md rounded-md p-1 flex flex-col gap-2 share-menu"
                                style={{left: '100%', zIndex: '10', width: '190px'}}
                              >
                            <button
                              onClick={() =>
                                window.open(
                                  generateSharingLink("X", result.verse, "https://example.com"), 
                                  "_blank"
                                )
                              }
                              className="flex items-center gap-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <img src="/images/x-icon.png" alt="X" className="w-5 h-5" />
                              <span>Share on X</span>
                            </button>

                            <button
                              onClick={() =>{
                                const shareText = `${result.verse} ~ Made with Versify\n${generateSharingLink(
                                  "Threads", 
                                  result.verse, 
                                  "https://example.com"
                                )}`;
                                copyToClipboard(shareText,index); 
                                window.open(
                                  generateSharingLink("Threads", result.verse, "https://example.com"), 
                                  "_blank"
                                )
                              }}
                              className="flex items-center gap-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <img src="/images/threads-icon.png" alt="Threads" className="w-5 h-5" />
                              <span>Share on Threads</span>
                            </button>

                            <button
                              onClick={() =>
                                window.open(
                                  generateSharingLink("Pinterest", result.verse, "https://example.com"),
                                  "_blank"
                                )
                              }
                              className="flex items-center gap-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <img src="/images/pinterest-icon.png" alt="Pinterest" className="w-5 h-5" />
                              <span>Share on Pinterest</span>
                            </button>

                            <button
                              onClick={() => {
                                const shareText = `${result.verse} ~ Made with Versify\n${generateSharingLink(
                                  "Instagram", 
                                  result.verse, 
                                  "https://example.com"
                                )}`;
                                copyToClipboard(shareText,index); 
                                window.open(
                                  generateSharingLink("Instagram", result.verse, "https://example.com"),
                                  "_blank"
                                );
                              }}
                              className="flex items-center gap-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <img src="/images/instagram-icon.png" alt="Instagram" className="w-5 h-5" />
                              <span>Share on Instagram</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )} 
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
    //   </div>
    // </StyledWrapper>
  );
}