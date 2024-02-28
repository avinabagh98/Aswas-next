"use client";

import styles from "./household.module.css";
import { useRouter } from "next/navigation";
import { Button, Table } from "react-bootstrap";

export default function page() {
  const data = [
    { round: 1, household: "Kamal Deb Nath" },
    { round: 2, household: "Arun Naskar" },
    { round: 3, household: "Kamal Deb Nath" },
    { round: 4, household: "Kamal Deb Nath" },
  ];
  const route = useRouter();
  const userRole = localStorage.getItem("role");
  return userRole === "hth" ? (
    <>
      <div className={styles.teamContainer}>
        <div className={styles.searchbar}>
          <input placeholder="Auto Search"></input>
          <Button
            variant="secondary"
            href="/home/layout/householdentry"
            className={styles.btn}
          >
            ADD NEW
          </Button>
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
                      <Button variant="success" href="/home/layout/survey">
                        Survey
                      </Button>
                      <Button variant="primary">Edit</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  ) : userRole === "hth-supervisor" ? (
    <>
      <div className={styles.teamContainer}>
        <input placeholder="Auto Search"></input>
        <div className={styles.tableContainer}>
          <Table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sl</th>
                <th>Household</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.round}</td>
                    <td>
                      {row.household}
                      <a className={styles.workDescription} href="#">
                        Work Description
                      </a>
                    </td>
                    <td className={styles.action}>
                      <a href="#">
                        <img src="/images/hth_supervisor_household_file_show_icon.png"></img>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  ) : userRole === "vct-member" ? (
    <>
      <div className={styles.teamContainer}>
        <input placeholder="Auto Search"></input>
        <div className={styles.tableContainer}>
          <Table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sl</th>
                <th>Household</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{row.round}</td>
                    <td>{row.household}</td>
                    <td className={styles.actionVct}>
                      <a href="#">
                        <img src="/images/vct_household_item_icon.png"></img>
                      </a>

                      <a href="#">
                        <img src="/images/hth_supervisor_team_member_location_icon.png"></img>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  ) : (
    <> userRole === ??? </>
  );
}
