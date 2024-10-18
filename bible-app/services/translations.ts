export const BibleTranslations = {
    baseURL: "https://bible-api.com",
    getTranslation: async function (bibleVerse: string, translation: string) {
        const response = await fetch(`${this.baseURL}/${bibleVerse}?translation=${translation}`);
        console.log(bibleVerse, translation);
        const data = await response.json();
        return data as {
            reference: string, text: string
        }
    }
}