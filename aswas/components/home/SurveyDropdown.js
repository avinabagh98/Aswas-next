import styles from "./SurveyDropdown.module.css";

export default function SurveyDropdown({ labelText }) {
  return (
    <>
      <div className={styles.dropdowncontainer}>
        <label>{labelText}</label>
        <select>
          <option value={"val"}></option>
        </select>
      </div>
    </>
  );
}
