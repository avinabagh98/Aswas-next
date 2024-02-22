const dictionaries = {
    en: () => import("./dictionaries/en.json").then(response => response.default),
    hi: () => import("./dictionaries/hi.json").then(response => response.default),
}

export const getDictionary = (lang) => {
    return dictionaries[lang]();
}
