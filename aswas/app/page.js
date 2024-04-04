"use client";

import styles from "./page.module.css";
import Footer from "@/components/prelogin/Footer";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  });

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
