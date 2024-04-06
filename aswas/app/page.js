"use client";

import styles from "./page.module.css";
import Footer from "@/components/prelogin/Footer";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/contexts/UserContext/UserContext";

export default function Home() {
  const router = useRouter();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        router.push("/home/dashboard");
      }, 3000);
    } else {
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    }
  }, [token]);

  return (
    <>
      <div>
        <div className={styles.header}>
          <h1>Vector Control Monitoring</h1>
        </div>
        <div className={styles.body}>
          <img src="images/west_bengal_biswa_bangla_logo.png"></img>
        </div>
        <Footer />
      </div>
    </>
  );
}
