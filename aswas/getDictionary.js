
const dictionaries = {
    en: () => import("./dictionaries/en.json").then(response => response.default),
    hi: () => import("./dictionaries/hi.json").then(response => response.default),
}

export const getDictionary = async (lang) => {
    const dictionary = dictionaries[lang];
    if (!dictionary) {
        throw new Error(`Dictionary for language '${lang}' not found.`);
    }

    try {
        const response = await dictionary();
        return response;
    } catch (error) {
        console.error(`Error fetching dictionary for language '${lang}':`, error);
        throw new Error(`Error fetching dictionary for language '${lang}'.`);
    }
}
