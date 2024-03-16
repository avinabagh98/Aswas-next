"use client";

import { useState, useEffect } from "react";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import styles from "./household.module.css";
import { useRouter } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";
import { useTeam } from "@/context/TeamContext"; //

export default function page() {
  const { teamNumber } = useTeam(); //
  const translate = LanguageFetcher();

  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const route = useRouter();

  //Localstorage and Token fetching
  useEffect(() => {
    const team_id = localStorage.getItem("team_id");
    const household_id = localStorage.getItem("household_id");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);
          // const response = await sendRequest("get", "/properties", null, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          // if (response.status === 1) {
          //   setAPI_Data(response.data);
          // } else {
          //   swal("Error", response.msg, "error");
          // }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    route.push("/home/survey");
  };






  const data = [
    { round: 1, household: `Arun Naskar House no.4` },
    { round: 2, household: "Arun Naskar" },
    { round: 3, household: "Kamal Deb Nath" },
    { round: 4, household: "Kamal Deb Nath" },
  ];


  return userRole === "hth-member" ? (
    <>
      <div className={styles.teamContainer}>
        <div className={styles.searchbar}>
          <input placeholder="Auto Search"></input>
          <Button
            variant="secondary"
            href="/home/householdentry"
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
        <h2>Team Number: {teamNumber}</h2>

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
                      <button
                        className={styles.workDescription}
                        onClick={handleClick}
                      >
                        {translate?.সুপারভাইসারদরে_নজিস্ব_কাজরে_ববিরণ}
                      </button>
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
