import styles from "./page.module.css";
import Footer from "@/components/prelogin/Footer";

export default function Home() {
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
