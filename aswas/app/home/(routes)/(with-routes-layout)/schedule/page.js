"use client";

import { useState, useEffect } from "react";
import Textparser from "@/components/home/Textparser";
import styles from "./schedule.module.css";
import { Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import SingleButton from "@/components/home/SingleButton";
import LanguageFetcher from "@/components/LanguageFetcher";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file
import swal from "sweetalert";
import { sendRequest } from "@/api/sendRequest";

export default function page() {
  const route = useRouter();
  const translate = LanguageFetcher();

  //User Details state variables
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState(null);
  //other state variables
  const [api_data_schedule, setAPI_Data_Schedule] = useState([]);
  const [api_data_userDetails, setAPI_Data_userDetails] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);

          //Fetching user details
          const user_details_response = await sendRequest(
            "get",
            "/user-details",
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
            console.log("response", schedule_response.data);
            setAPI_Data_Schedule(schedule_response.data);
          }

          if (user_details_response.status === 1) {
            console.log("User Details Response ::", user_details_response.data);
            setAPI_Data_userDetails(user_details_response.data);
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //API Data Showing
  useEffect(() => {
    console.log(api_data_schedule); // This will log the updated value of api_data
    console.log(api_data_userDetails);
    localStorage.setItem("user_id", api_data_userDetails.id);
    localStorage.setItem("team_id", api_data_userDetails.team_id);
    if (api_data_userDetails.ward) {
      localStorage.setItem("ward_id", api_data_userDetails.ward.id);
    }

    if (api_data_userDetails.municipality) {
      localStorage.setItem(
        "municipality_id",
        api_data_userDetails.municipality.id
      );
    }
  }, [api_data_schedule, api_data_userDetails]);

  //Handler Functions
  const handleMembersSurveyBtn = (e) => {
    e.preventDefault();
    route.push("/home/team");
  };

  const handleDailySurveyBtn = (e) => {
    e.preventDefault();
    route.push("/home/dailysurveyreport");
  };

  try {
    //DUMMY DATA/////
    // const data = [
    //   { round: 1, date: "2022-04-24 To 2022-04-25", action: "Ongoing" },
    //   { round: 2, date: "2022-05-01 To 2022-05-02", action: "Completed" },
    //   { round: 3, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    //   { round: 4, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    // ];

    const data = api_data_schedule;

    return userRole === "hth-member" ? (
      <>
        <div className={styles.hth_mem_text}>
          <Textparser text="Schedule" />
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
                const { status } = row;
                let classname;
                if (status === "CLOSED") {
                  classname = styles.completed;
                }
                if (status === "ONGOING") {
                  classname = styles.ongoing;
                }
                if (status === "Upcoming") {
                  classname = styles.upcoming;
                }
                return (
                  <tr key={index}>
                    <td className={classname}>{row.round}</td>
                    <td
                      className={classname}
                      onClick={() => {
                        route.push("/home/team");
                      }}
                    >
                      {row.date_range}
                    </td>
                    <td className={classname}>{row.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    ) : userRole === "vct-member" ? (
      <>
        <div className={styles.vct_mem_teamContainer}>
          <input placeholder="Auto Search"></input>
          <div className={styles.vct_mem_tableContainer}>
            <Table>
              <thead className={styles.vct_mem_tableHead}>
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
                      <td className={styles.vct_mem_actionVct}>
                        <a href="/home/survey">
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
    ) : userRole === "hth-supervisor" ? (
      <>
        <div className={styles.text}>
          <Textparser text={"Schedule"} />
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
                const { status } = row;
                let classname;
                if (status === "CLOSED") {
                  classname = styles.hthSupervisorCompleted;
                }
                if (status === "ONGOING") {
                  classname = styles.ongoing;
                }
                if (status === "Upcoming") {
                  classname = styles.hthSupervisorUpcoming;
                }
                return (
                  <tr key={index}>
                    <td className={classname}>{row.round}</td>

                    <td className={classname}>{row.date_range}</td>

                    {status === "ONGOING" ? (
                      <td className={classname}>
                        <SingleButton
                          btnText={"Members Survey"}
                          href={"#"}
                          onClick={handleMembersSurveyBtn}
                        />
                      </td>
                    ) : (
                      <td className={classname}>{row.status}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div>
          <SingleButton
            btnText="Daily Survey Report"
            href={"/home/dailysurveyreport"}
            onClick={handleDailySurveyBtn}
          />
        </div>
      </>
    ) : (
      <>
        <div className={styles.text}>
          <Skeleton height={20} width={"100%"} />
        </div>

        <div className={styles.tableContainer}>
          <Table>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <Skeleton height={20} width={50} />
                </th>
                <th>
                  <Skeleton height={20} width={50} />
                </th>
                <th>
                  <Skeleton height={20} width={80} />
                </th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton height={20} width={50} />
                  </td>
                  <td>
                    <Skeleton height={20} width={50} />
                  </td>
                  <td>
                    <Skeleton height={20} width={100} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  } catch (error) {
    swal("Error", error.message, "error");
  }
}
