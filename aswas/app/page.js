"use client";

import styles from "./page.module.css";
import Footer from "@/components/prelogin/Footer";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Redirecting...");
    setTimeout(() => {
      router.push("/home");
    }, 5000);
  });

  return (
    <>
      <div>
        <div className={styles.header}>
          <h1>VECTOR CONTROL MONITORING</h1>
        </div>
        <div className={styles.body}>
          <img src="images/west_bengal_biswa_bangla_logo.png"></img>
        </div>
        <Footer />
      </div>
    </>
  );
}
