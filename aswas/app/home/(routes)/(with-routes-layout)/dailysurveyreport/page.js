"use client";

import { useState, useEffect } from "react";
import styles from "./dailyreport.module.css";
import DynamicDropdown from "@/components/DynamicDropdown/DynamicDropdown";
import { sendRequest } from "@/api/sendRequest";
import swal from "sweetalert";
import LanguageFetcher from "@/components/LanguageFetcher";

export default function page() {
  //language fetcher
  const translate = LanguageFetcher();

  //User details state vaiables
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [municipality_id, setMunicipality_id] = useState(null);
  const [ward_id, setWard_id] = useState(null);
  const [user_id, setUser_ID] = useState(null);
  const [schedule_id, setSchedule_id] = useState(null);
  //other state variables
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [api_data_dailysurveyreport, setAPI_Data_DailySurveyReport] = useState(
    []
  );
  const [api_data_schedule, setAPI_Data_Schedule] = useState([]);
  // const [survey_data, setSurvey_Data] = useState([]);

  const survey_data = [];
  const team_survey_body_data = {
    token: token,
    municipality_id: municipality_id,
    ward_id: ward_id,
    user_id: user_id,
    start_date: startDate,
    end_date: endDate,
  };

  //Localstorage and Token fetching
  useEffect(() => {
    const team_id = localStorage.getItem("team_id");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setToken(token);
          setUserRole(localStorage.getItem("role_name"));
          setUser_ID(localStorage.getItem("user_id"));
          setMunicipality_id(localStorage.getItem("municipality_id"));
          setWard_id(localStorage.getItem("ward_id"));

          //Fetching schedule details
          const schedule_response = await sendRequest(
            "get",
            "/schedules",
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (schedule_response.status === 1) {
            console.log("Response Schedule", schedule_response.data);
            setAPI_Data_Schedule(schedule_response.data);
          }
        }
      }

      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //Showing API data
  useEffect(() => {
    console.log("daily survey report", api_data_dailysurveyreport);
    console.log(api_data_schedule);
    api_data_dailysurveyreport.map((row, index) => {
      console.log("row", row);
      if (row.survey_data) {
        console.log("survey_data", index, row.survey_data);
        survey_data.push(row.survey_data);
      }
    });
    api_data_schedule.map((row) => {
      if (row.status === "ONGOING") {
        console.log(row);
        setSchedule_id(row.id);
      }
    });

    console.log("schedule_id", schedule_id);
    console.log("survey_data", survey_data);
  }, [api_data_dailysurveyreport, api_data_schedule, schedule_id, survey_data]);

  //Handler Functions
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDynamicDropdown = (e) => {
    console.log("schedule_id from dropdown", e.target.value);
    setSchedule_id(e.target.value);
  };

  const handleApply = async () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("survey_data", survey_data);

    //api call for daily survey report
    const response_dailysurveyreport = await sendRequest(
      "get",
      `/schedules/${schedule_id}/team-survey-data`,
      team_survey_body_data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response_dailysurveyreport.status === 1) {
      setAPI_Data_DailySurveyReport(response_dailysurveyreport.data);
    } else {
      swal("Error", "Error API Call", "error");
    }
  };

  const scheduleListOptions = api_data_schedule;

  return (
    <>
      <div>
        <div className={styles.dailySurveyReportContainer}>
          <DynamicDropdown
            id="scheduleList"
            label="Schedule List"
            options={scheduleListOptions}
            onChange={handleDynamicDropdown}
          />
        </div>
        <div className={styles.section}>
          <div className={styles.datePickerContainer}>
            <label className={styles.label} htmlFor="start">
              Start Date:
            </label>
            <input
              className={styles.inputField}
              type="date"
              id="start"
              value={startDate}
              onChange={handleStartDateChange}
            />

            <label className={styles.label} htmlFor="end">
              End Date:
            </label>
            <input
              className={styles.inputField}
              type="date"
              id="end"
              value={endDate}
              onChange={handleEndDateChange}
            />

            <button className={styles.button} onClick={handleApply}>
              Apply
            </button>
          </div>

          <div className={styles.tableContainer}>
            {api_data_dailysurveyreport.map((team, index) => (
              <table key={index}>
                <thead>
                  <tr>
                    <th colSpan="2">Team Number: {team.number}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{translate?.team_list_servey_f_1}</td>
                    <td>{team.survey_data.total_properties}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_2}</td>
                    <td>{team.survey_data.total_members}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_3}</td>
                    <td>{team.survey_data.total_fever_cases}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_4}</td>
                    <td>{team.survey_data.total_indoor_breeding_spots}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_5}</td>
                    <td>
                      {team.survey_data.total_peridomestic_breeding_spots}
                    </td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_6}</td>
                    <td>{team.survey_data.total_blocked_drains}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_7}</td>
                    <td>{team.survey_data.total_water_containers}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_8}</td>
                    <td>
                      {team.survey_data.total_water_containers_with_larva}
                    </td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_9}</td>
                    <td>{team.survey_data.total_water_containers_managed}</td>
                  </tr>
                  <tr>
                    <td>{translate?.team_list_servey_f_10}</td>
                    <td>{team.survey_data.total_leaflets_distributed}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
