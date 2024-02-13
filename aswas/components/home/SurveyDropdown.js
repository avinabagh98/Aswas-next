import styles from "./surveyques.module.css";

export default function Surveyques({ labelText }) {
  return (
    <>
      <div className={styles.container}>
        <label>{labelText}</label>
        <select className={styles.surveySelect}>
          <option value={"val"}>val</option>
        </select>
      </div>
    </>
  );
}
