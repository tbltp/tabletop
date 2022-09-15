function searchInDictionary(key: string, dictionary: object): any | undefined {
    /**
     * Takes in a key and a dictionary and returns the corresponding value if found
     * otherwise returns undefined
     */
    if (key in dictionary) {
        return dictionary[key];
    }
    return undefined;
}

function isEqualIgnoreCase(str1: string, str2: string): boolean {
    /**
     * Checks if two strings match regardless of casing
     */
    return str1.toLowerCase() === str2.toLowerCase();
}

export { searchInDictionary, isEqualIgnoreCase };
