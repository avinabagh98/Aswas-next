"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import { ShowOffCanvas } from "@/components/ShowOffCanvas";

export default function Page() {
  useEffect(() => {
    ShowOffCanvas(true);
  }, []);

  const route = useRouter();
  const translate = LanguageFetcher();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginData = {
    username: username,
    password: password,
  };

  // const loginHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("loginData:", loginData);

  //   try {
  //     const response = await sendRequest("post", "/login", loginData, {
  //       "Content-Type": "application/json",
  //     });

  //     // Handle the response here
  //     console.log("Login response:", response);
  //     // You can add logic here to redirect the user or show a success message
  //   } catch (error) {
  //     // Handle errors, such as network errors or server errors
  //     console.error("Login error:", error);
  //     // You can add logic here to display an error message to the user
  //   }
  // };

  const loginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("isOffCanvasVisible", true);
    route.push("/home/schedule");
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
          <button onClick={loginHandler}>{translate?.login}</button>
          <a href="#">
            <p>{translate?.forgot_your_password}</p>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
