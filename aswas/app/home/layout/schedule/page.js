import Textparser from "@/components/home/Textparser";
import styles from "./schedule.module.css";
import { Table } from "react-bootstrap";

export default function page() {
  const data = [
    { round: 1, date: "2022-04-24 To 2022-04-25", action: "On Going" },
    { round: 2, date: "2022-05-01 To 2022-05-02", action: "Completed" },
    { round: 3, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    { round: 4, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
  ];

  return (
    <>
      <div className={styles.text}>
        <Textparser text={"this is a dummy text"} />
      </div>

      <div className={styles.tableContainer}>
        <Table>
          <thead className={styles.tableHead}>
            <tr>
              <th>Round</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((row, index) => {
              const { action } = row;
              let classname;
              if (action === "Completed") {
                classname = styles.completed;
              }
              if (action === "On Going") {
                classname = styles.ongoing;
              }
              if (action === "Upcoming") {
                classname = styles.upcoming;
              }
              return (
                <tr key={index}>
                  <td className={classname}>{row.round}</td>
                  <td className={classname}>{row.date}</td>
                  <td className={classname}>{row.action}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
