"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/getDictionary";
import { useState, useEffect } from "react";

export default function Page() {
  const route = useRouter();
  const [language, setLanguage] = useState("");
  const [translate, setTranslate] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    username: username,
    password: password
  }


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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    route.push("/home/schedule")
  };


  return (
    <>
      <div className={styles.loginContainer}>
        <h2>USER LOGIN</h2>
        <div className={styles.loginForm}>
          <span>
            <label htmlFor="username">{translate.form?.username}</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username"></input>
          </span>
          <span>
            <label htmlFor="password">{translate.form?.password}</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password"></input>
          </span>
          <button onClick={submitHandler}>LOG IN</button>
          <a href="#">
            <p> Forgot Your Password?</p>
          </a>
        </div>
      </div >
      <Footer />
    </>
  );
}
