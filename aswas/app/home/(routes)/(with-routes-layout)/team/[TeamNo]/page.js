"use client";

import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./TeamNum.module.css";
import { useTeam } from "@/context/TeamContext"; //
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
export default function page({ params }) {
  const route = useRouter();
  const { teamNumber, setTeamNumber } = useTeam(); //
  const [api_data_TeamHouehold, setApi_Data_TeamHouehold] = useState();

  //Localstorage and Token fetching
  useEffect(() => {
    setTeamNumber(params.TeamNo);
    const team_id = localStorage.getItem("team_id");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
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
            setApi_Data_TeamHouehold(response_TeamHouehold.data);
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  useEffect(() => {
    console.log("api_data_TeamHouehold", api_data_TeamHouehold);
  }, [api_data_TeamHouehold]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    route.push("/home/householdlist");
  };

  return (
    <>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>SL</th>
            <th>Household</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {api_data_TeamHouehold?.map((item, index) => (
            <tr key={index}>
              <td
                className={
                  item.has_ongoing_hth_member_survey ? styles.surveyDone : null
                }
              >
                {item.id}
              </td>
              <td
                className={
                  item.has_ongoing_hth_member_survey ? styles.surveyDone : null
                }
              >
                {item.name}
              </td>
              <td
                className={
                  item.has_ongoing_hth_member_survey
                    ? styles.surveyDoneAction
                    : styles.action
                }
              >
                <button onClick={(e) => handleButtonClick(e, item.id)}>
                  <img
                    src="/images/hth_supervisor_team_member_file_show_icon.png"
                    alt="icon"
                  />
                </button>
                <a href="#">
                  <img
                    src="/images/hth_supervisor_team_member_location_icon.png"
                    alt="icon"
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
