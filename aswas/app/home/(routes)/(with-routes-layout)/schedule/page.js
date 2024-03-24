"use client";

import { useState, useEffect } from "react";
import Textparser from "@/components/home/Textparser";
import styles from "./schedule.module.css";
import { Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import SingleButton from "@/components/home/SingleButton";
import LanguageFetcher from "@/components/LanguageFetcher";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file
import swal from "sweetalert";
import { sendRequest } from "@/api/sendRequest";
import Header from "@/components/Header/Header";

export default function page() {
  const route = useRouter();

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
    localStorage.setItem("name", api_data_userDetails.name);

    if (api_data_userDetails.ward) {
      localStorage.setItem("ward_id", api_data_userDetails.ward.id);
      localStorage.setItem("ward_name", api_data_userDetails.ward.name);
    }

    if (api_data_userDetails.team) {
      localStorage.setItem("team_number", api_data_userDetails.team.number);
    }

    if (api_data_userDetails.municipality) {
      localStorage.setItem(
        "municipality_id",
        api_data_userDetails.municipality.id
      );
      localStorage.setItem(
        "municipality_name",
        api_data_userDetails.municipality.name
      );
    }

    api_data_schedule.map((item) => {
      if (item.status === "ONGOING") {
        localStorage.setItem("round", item.round);
      }
    });
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

  const clickHandler = (status) => {
    if (status === "ONGOING") {
      route.push("/home/team");
    }
  };

  try {
    const data = api_data_schedule;

    return userRole === "hth-member" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
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
                      name={row.status}
                      onClick={() => {
                        clickHandler(row.status);
                        // route.push("/home/team");
                      }}
                    >
                      {row.name}
                    </td>
                    <td className={classname}>{row.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    ) : userRole === "vct-supervisor" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
        <div className={styles.vct_supervisor_text}>
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
                      {row.name}
                    </td>
                    <td className={classname}>{row.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div>
            <SingleButton
              btnText="Daily Survey Report"
              href={"/home/dailysurveyreport"}
              onClick={handleDailySurveyBtn}
            />
          </div>
        </div>
      </>
    ) : userRole === "hth-supervisor" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
        <div className={styles.hth_supervisor_text}>
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
    swal("Error", error, "error");
  }
}
