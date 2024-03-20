"use client";

import { useState, useEffect } from "react";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import styles from "./household.module.css";
import { useRouter } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";
import { useTeam } from "@/context/TeamContext"; //
import swal from "sweetalert";
import { sendRequest } from "@/api/sendRequest";

export default function page() {
  const { teamNumber } = useTeam(); //
  const translate = LanguageFetcher();

  const [userRole, setUserRole] = useState("");
  const [api_data_HSTeamhHousehold, setAPI_Data_HSTeamhHousehold] = useState(
    []
  );

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
          //api call households surveyed by teams
          const response_TeamHouehold = await sendRequest(
            "get",
            `/teams/${team_id}/properties`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response_TeamHouehold.status === 1) {
            setAPI_Data_HSTeamhHousehold(response_TeamHouehold.data);
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //show api data
  useEffect(() => {
    console.log("api_data_HSTeamhHousehold", api_data_HSTeamhHousehold);
  }, [api_data_HSTeamhHousehold]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    route.push("/home/survey");
  };

  const householdFileShowHandler = async (e) => {
    e.preventDefault();
    const household_id = e.target.id;
    localStorage.setItem("household_id", household_id);
    // route.push("/home/read-property-survey");
  };

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
      <div className={styles.teamContainerHS}>
        <input placeholder="Auto Search"></input>
        <div className={styles.tableContainerHS}>
          <table>
            <thead className={styles.tableHeadHS}>
              <tr>
                <th>Sl</th>
                <th>Household</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {api_data_HSTeamhHousehold.map((row, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={
                        row.has_ongoing_hth_member_survey
                          ? styles.surveyDoneHM
                          : null
                      }
                    >
                      {row.id}
                    </td>

                    <td
                      className={
                        row.has_ongoing_hth_member_survey
                          ? styles.surveyDoneHM
                          : null
                      }
                    >
                      {row.name}
                      <button
                        className={
                          row.has_ongoing_hth_super_survey
                            ? styles.surveyDoneHS
                            : styles.workDescription
                        }
                        onClick={handleClick}
                      >
                        {translate?.সুপারভাইসারদরে_নজিস্ব_কাজরে_ববিরণ}
                      </button>
                    </td>

                    <td
                      className={
                        row.has_ongoing_hth_member_survey
                          ? styles.surveyDoneActionHM
                          : styles.actionHS
                      }
                    >
                      <a
                        href="#"
                        onClick={() => {
                          const household_id = row.id;
                          localStorage.setItem("household_id", household_id);
                          localStorage.setItem("household_name", row.name);
                          route.push("/home/read-property-survey");
                        }}
                      >
                        <img src="/images/hth_supervisor_household_file_show_icon.png"></img>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
