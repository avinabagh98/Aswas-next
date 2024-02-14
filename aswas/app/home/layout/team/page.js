import styles from "./team.module.css";
import { Table } from "react-bootstrap";

export default function page() {
  const data = [
    { round: 1, household: "Kamal Deb Nath" },
    { round: 2, household: "Arun Naskar" },
    { round: 3, household: "Kamal Deb Nath" },
    { round: 4, household: "Kamal Deb Nath" },
    { round: 5, household: "Kamal Deb Nath" },
    { round: 6, household: "Kamal Deb Nath" },
    { round: 7, household: "Kamal Deb Nath" },
    { round: 8, household: "Kamal Deb Nath" },
    { round: 9, household: "Kamal Deb Nath" },
    { round: 10, household: "Kamal Deb Nath" },
  ];
  return (
    <>
      <div className={styles.teamContainer}>
        <div className={styles.searchbar}>
          <input placeholder="Auto Search"></input>
          <button>ADD NEW</button>
        </div>

        <div className={styles.tableContainer}>
          <Table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sl</th>
                <th>Household</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.round}</td>
                    <td>{row.household}</td>
                    <td className="d-flex gap-2 justify-content-center ">
                      <button className="btn btn-success">Survey</button>
                      <button className="btn btn-primary">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
