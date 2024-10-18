'use client'
import { BibleTranslations } from "@/services/translations";
import { decimalToPercentage, extractBibleVerseInfo } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface SearchResultListItemProps {
    translation?: string,
    verse: string,
    similarity: number,
    copyText: () => void,
    isCopied: boolean
}

interface SearchResultListProps {
    searchResults: [string, number][],
}

export default function SearchResultList({ searchResults }: SearchResultListProps) {
    const [translation] = useQueryState('translation');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
        });
    };
    

    return (
        <ul className="flex flex-col gap-4 w-full sm:w-[80%] text-gray-600">
            {searchResults?.map((result, index) => (
                <SearchResultListItem 
                    key={result[0]} 
                    verse={result[0]} 
                    similarity={result[1]} 
                    translation={translation || "default"}
                    isCopied={copiedIndex === index}
                    copyText={() => copyToClipboard(`1 John ${result[0]} - Similarity: ${decimalToPercentage(result[1])}`, index)}
                />
            ))}
        </ul>
    )
}

function SearchResultListItem ({ 
    translation, 
    verse, 
    similarity, 
    isCopied, 
    copyText 
}: SearchResultListItemProps) {
    const chatpterAndVerse = extractBibleVerseInfo(verse);
    const fullVerse = `1john ${chatpterAndVerse}`

    const { isLoading, data: translatedVerse } = useQuery({
        queryKey: ["translation", fullVerse, translation],
        queryFn: async () => {
            if (translation === "default") return verse;

            const response = await BibleTranslations.getTranslation(fullVerse, translation!);
            if (!response.text) return `Translation not avialable for 1 John ${chatpterAndVerse}`
            return `${chatpterAndVerse} ${response.text}`
        }
    })

    return (
        <li className="p-4 bg-white rounded-xl shadow">
            <div className="flex justify-between items-start">
                <div className="min-w-[270px]">
                    {
                        isLoading ? <Skeleton className="h-4 w-[240px]" /> :
                        <>
                            <p className="text-md font-semibold mb-2">
                                <span className="text-siteColor font-bold">Verse:</span> 1
                                John {translatedVerse}
                            </p>
                            <p className="text-md font-semibold">
                                <span className="text-siteColor font-bold">
                                    Similarity:
                                </span>{" "}
                                {decimalToPercentage(similarity)}
                            </p>                    
                        </>
                    }
                </div>
                <button 
                    onClick={copyText}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Copy to clipboard"
                >
                    {isCopied ? (
                    <Check className="w-5 h-5 text-green-500" />
                    ) : (
                    <Copy className="w-5 h-5" />
                    )}
                </button>
            </div>
        </li>


    )
}