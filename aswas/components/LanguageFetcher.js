"use client";

import { getDictionary } from "@/getDictionary";
import { useState, useEffect } from "react";
//Import for Context API
import { useContext } from "react";
import LanguageContext from "@/contexts/LanguageContext";

export default function LanguageFetcher() {
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState({});

  //Context API
  const { languageVal } = useContext(LanguageContext);
  useEffect(() => {
    // Update language state
    setLanguage(languageVal);

    // Fetch translation based on language
    async function fetchTranslation(lang) {
      try {
        const translation = await getDictionary(lang);
        setTranslate(translation);
      } catch (error) {
        console.error("Error fetching translation:", error);
      }
    }

    fetchTranslation(languageVal);
  }, []);
  return translate;
}
