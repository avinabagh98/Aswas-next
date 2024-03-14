"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";
import { sendRequest } from "@/api/sendRequest";
import { ShowOffCanvas } from "@/components/ShowOffCanvas";
import axios from "axios";
import swal from 'sweetalert';
import LocalStorageFetcher from "@/components/LocalStorageFetcher";

export default function Page() {
  useEffect(() => {
    ShowOffCanvas(true);
  }, []);

  const route = useRouter();
  const translate = LanguageFetcher();
  const role_id = LocalStorageFetcher({ keyName: "role_id" });

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginData = {
    phone: username,
    password: password,
    role_id: role_id
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

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, loginData);
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("phone", username);
      swal("Successfully", "logged in", "success");
      route.push("/home/schedule");
    } catch (error) {
      swal("Login Error", "Please enter valid credentials", "error");
    }

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
