"use client";

import { getDictionary } from "@/getDictionary";
import { useState, useEffect } from "react";

export default function LanguageFetcher() {
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState({});

  useEffect(() => {
    // Fetch language from local storage
    const dataString = localStorage.getItem("data");
    const dataObject = JSON.parse(dataString);
    const storedLanguage = dataObject?.language || "en";

    // Update language state
    setLanguage(storedLanguage);

    // Fetch translation based on language
    async function fetchTranslation(lang) {
      try {
        const translation = await getDictionary(lang);
        setTranslate(translation);
      } catch (error) {
        console.error("Error fetching translation:", error);
      }
    }

    fetchTranslation(storedLanguage);
  }, []);
  return translate;
}
