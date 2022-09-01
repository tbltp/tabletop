function searchInDictionary(key: string, dictionary: object): any | undefined {
    /*
    Takes in a key and a dictionary and returns the corresponding value if found
    otherwise returns undefined
    */
    if (key in dictionary) {
        return dictionary[key];
    }
    return undefined;
}

export { searchInDictionary };
