'use client'
import { BibleTranslations } from "@/services/translations";
import { extractBibleVerseInfo } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

interface SearchResultListItemProps {
    translation?: string,
    verse: string,
    similarity: number
}

interface SearchResultListProps {
    searchResults: [string, number][],
    trasnslation?: string
}

export default function SearchResultList({ searchResults }: SearchResultListProps) {
    const [translation] = useQueryState('translation');

    return (
        <ul className="flex flex-col gap-4 w-full sm:w-[80%] text-gray-600">
            {searchResults?.map((result) => (
                <SearchResultListItem 
                    key={result[0]} 
                    verse={result[0]} 
                    similarity={result[1]} 
                    translation={translation || "default"}
                />
            ))}
        </ul>
    )
}

function SearchResultListItem ({ translation, verse, similarity }: SearchResultListItemProps) {
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
            {
                isLoading ? <p className="text-md font-semibold mb-2">Loading...</p> : 
                <>
                    <p className="text-md font-semibold mb-2">
                        <span className="text-siteColor font-bold">Verse:</span> 1 John {translatedVerse}
                    </p>
                    <p className="text-md font-semibold">
                        <span className="text-siteColor font-bold">Similarity:</span> {similarity}
                    </p>
                </>
            }
        </li>

    )
}