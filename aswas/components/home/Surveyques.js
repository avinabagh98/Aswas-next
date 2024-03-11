import styles from "./surveyques.module.css";

export default function Surveyques({ id, labelText, handleVal }) {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          onChange={(e) => handleVal(id, e.target.value)}
          className={styles.surveyInput}
        ></input>
      </div>
    </>
  );
}
