import styles from "./SurveyDropdown.module.css";

export default function SurveyDropdown({
  id,
  labelText,
  numberOfOptions,
  options,
}) {
  return (
    <>
      <div className={styles.dropdowncontainer}>
        <label>{labelText}</label>
        <select id={id}>
          {Array.from({ length: numberOfOptions }, (_, index) => (
            <option key={index} value={options[index]}>
              {options[index]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
