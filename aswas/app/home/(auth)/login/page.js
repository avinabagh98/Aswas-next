"use client";

import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  return (
    <>
      <div className={styles.loginContainer}>
        <h2>USER LOGIN</h2>
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
