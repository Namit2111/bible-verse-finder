'use client'
import { useQueryState } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const translations = [
    {
        name: "Cherokee New Testament",
        identifier: "cherokee"
    },
    {
        name: "Bible Kralicka",
        identifier: "bkr"
    },
    {
        name: "American Standard Version (1901)",
        identifier: "asv"
    },
    {
        name: "Bible in Basic English",
        identifier: "bbe"
    },
    {
        name: "Darby Bible",
        identifier: "darby"
    },
    {
        name: "Douay-Rheims 1899 American Edition",
        identifier: "dra"
    },
    {
        name: "King James Version",
        identifier: "kjv"
    },
    {
        name: "World English Bible",
        identifier: "web"
    },
    {
        name: "Young's Literal Translation",
        identifier: "ylt"
    },
    {
        name: "Open English Bible, Commonwealth Edition",
        identifier: "oeb-cw"
    },
    {
        name: "World English Bible, British Edition",
        identifier: "webbe"
    },
    {
        name: "Open English Bible, US Edition",
        identifier: "oeb-us"
    },
    {
        name: "Clementine Latin Vulgate",
        identifier: "clementine"
    },
    {
        name: "João Ferreira de Almeida",
        identifier: "almeida"
    },    
    {
        name: "Protestant Romanian Corrected Cornilescu Version",
        identifier: "rccv"
    },
]

export default function TranslationSelect() {
    const [translation, setTranslation] = useQueryState('translation');

    return (
        <div className="flex flex-col items-center mb-3 gap-3 w-full">
            <label htmlFor="translations" className="text-xl font-bold text-gray-700">Translation</label>

            <Select
                name="translations"
                value={translation ?? undefined}
                onValueChange={setTranslation}
            >
                <SelectTrigger className="border-gray-300">
                    <SelectValue className="py-2" placeholder="Select a Translation" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">
                        Default
                    </SelectItem>
                    {
                        translations.map((translation) => (
                            <SelectItem 
                                key={translation.name} 
                                value={translation.identifier}
                            >
                                {translation.name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}