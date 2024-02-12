import styles from "./surveyques.module.css";

export default function Surveyques({ labelText }) {
  return (
    <>
      <div className={styles.container}>
        <label>{labelText}</label>
        <input className={styles.surveyInput}></input>
      </div>
    </>
  );
}
