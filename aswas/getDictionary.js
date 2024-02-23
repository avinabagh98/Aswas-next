
const dictionaries = {
    en: () => import("./dictionaries/en.json").then(response => response.default),
    hi: () => import("./dictionaries/hi.json").then(response => response.default),
    bn: () => import("./dictionaries/bn.json").then(response => response.default)
}

export const getDictionary = async (lang) => {
    const dictionary = dictionaries[lang]; //here dictionary will be a function
    if (!dictionary) {
        console.log(`Dictionary for language '${lang}' not found.`);
        return dictionaries['en']();
    }

    else {
        try {
            const response = await dictionary();
            return response;
        } catch (error) {
            throw new Error(`Error fetching dictionary for language '${lang}'.`);
        }
    }
}
