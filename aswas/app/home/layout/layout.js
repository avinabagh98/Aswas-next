import styles from "./layout.module.css";
import Textparser from "@/components/home/Textparser";

export default function layout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.namebar}>
          <span>
            <Textparser text={"Arun Naskar (HTH)"} />
            <br />
            <Textparser text={"Baruipur-Ward No.12-Team No.2"} />
          </span>
          <span>Round-1</span>
        </div>
        {children}
      </div>
    </>
  );
}
