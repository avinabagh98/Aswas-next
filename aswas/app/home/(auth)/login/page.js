"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";

export default function Page() {
  const route = useRouter();
  const translate = LanguageFetcher();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");

  const loginData = {
    username: username,
    password: password,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(loginData);
    route.push("/home/schedule");
    localStorage.setItem("username", loginData.username);
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>{translate?.user_login}</h2>
        <div className={styles.loginForm}>
          <span>
            <label htmlFor="username">{translate?.user_name}</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            ></input>
          </span>
          <span>
            <label htmlFor="password">{translate?.password}</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            ></input>
          </span>
          <button onClick={submitHandler}>{translate?.login}</button>
          <a href="#">
            <p>{translate?.forgot_your_password}</p>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
