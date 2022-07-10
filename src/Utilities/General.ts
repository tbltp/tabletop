function searchInDictionary(key: string, dictionary: object):  any | undefined {
    if(key in dictionary) {
        return dictionary[key];
    }
    return undefined;
}

export {
    searchInDictionary
};