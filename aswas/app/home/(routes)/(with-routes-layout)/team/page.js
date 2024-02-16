"use client";

import styles from "./team.module.css";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function page() {
  try {
    const routeHandler = (e) => {
      e.preventDefault();
      const value = e.target.id;
      route.push(`/home/team/${value}`);
    };

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
    const route = useRouter();
    const userRole = localStorage.getItem("role");

    return userRole === "hth-supervisor" ? (
      <>
        <Table className={styles.tableContainer2}>
          <thead>
            <tr>
              <th>TEAM LIST</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                id="team1"
                onClick={(e) => {
                  routeHandler(e);
                }}
              >
                Team1
              </td>
              <td
                id="team2"
                onClick={(e) => {
                  routeHandler(e);
                }}
              >
                Team2
              </td>
              <td
                id="team3"
                onClick={(e) => {
                  routeHandler(e);
                }}
              >
                Team3
              </td>
              <td
                id="team4"
                onClick={(e) => {
                  routeHandler(e);
                }}
              >
                Team4
              </td>
              <td
                id="team5"
                onClick={(e) => {
                  routeHandler(e);
                }}
              >
                Team5
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    ) : userRole === "hth" ? (
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
    ) : (
      <> userRole === " ??? " </>
    );
  } catch (error) {
    console.log(error);
  }
}
