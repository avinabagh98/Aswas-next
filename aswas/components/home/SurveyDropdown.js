import styles from "./SurveyDropdown.module.css";

export default function SurveyDropdown({
  id,
  labelText,
  numberOfOptions,
  options,
  handleVal,
}) {
  return (
    <>
      <div className={styles.dropdowncontainer}>
        <label htmlFor={id}>{labelText}</label>
        <select id={id} onChange={(e) => handleVal(id, e.target.value)}>
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
