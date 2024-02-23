"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/getDictionary";
import { useState, useEffect } from "react";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";

export default function Page() {
  const route = useRouter();
  // const language = LocalStorageFetcher({ keyName: "language" });
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState({});


  useEffect(() => {
    // Fetch language from local storage
    const dataString = localStorage.getItem('data');
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

  // useEffect(() => {
  //   async function fetchLanguage(lang) {
  //     try {
  //       const dataString = localStorage.getItem('data');
  //       const dataObject = JSON.parse(dataString);
  //       setLanguage(dataObject?.language)
  //       console.log(language);
  //       const translation = await getDictionary(lang); // || "en "
  //       setTranslate(translation);
  //       console.log(translate);
  //     } catch (error) {
  //       console.error("Error fetching translation:", error);
  //     }
  //   }

  //   fetchLanguage(language);
  // }, [language, translate]);

  // const fetchTranslation = async (lang) => {
  //   try {
  //     console.log(lang)
  //     const translation = await getDictionary(lang);
  //     setTranslate(translation);
  //   } catch (error) {
  //     console.error("Error fetching translation:", error);
  //   }
  // };

  // // Fetch translation based on language whenever language changes
  // fetchTranslation(language);

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>USER LOGIN</h2>
        <h3>{translate.form?.text}</h3>
        <div className={styles.loginForm}>
          <span>
            <label htmlFor="username">USER NAME</label>
            <input type="text" id="username"></input>
          </span>
          <span>
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password"></input>
          </span>
          <button onClick={() => route.push("/home/schedule")}>LOG IN</button>
          <a href="#">
            <p> Forgot Your Password?</p>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
