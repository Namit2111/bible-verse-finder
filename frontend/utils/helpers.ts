export function extractBibleVerseInfo(verseString: string): string {
    // Regular expression to match various Bible verse formats
    //const regex = /^(\d*\s*[A-Za-z]+)\s*(\d+):(\d+)/;
    //const match = verseString.match(regex);

    const modifiedString = verseString.replace(' ', '%');
    const chapterAndVerse = modifiedString.split('%')[0];

    return chapterAndVerse;
}

export function decimalToPercentage(decimal: number): string {
    return (decimal * 100).toFixed(1) + '%';
}
  