"use client";

import { useEffect, useState } from "react";
import styles from "./team.module.css";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header/Header";

export default function page() {
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();
  const [api_data, setAPI_Data] = useState([]);
  const [api_data_HS, setAPI_Data_HS] = useState([]);
  const [api_dataVCT, setAPI_DataVCT] = useState([]);
  const [issurveyDone, setIssurveyDone] = useState(false);
  const [round, setRound] = useState(null);
  const route = useRouter();

  //Localstorage and Token fetching
  useEffect(() => {
    localStorage.removeItem("flag");
    localStorage.removeItem("household_id(survey-update)");
    localStorage.removeItem("household_name");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        const roundNo = localStorage.getItem("round");
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);
          setRound(localStorage.getItem("round"));

          //api call for hth mem
          if (userRole === "hth-member") {
            const response_householdlist = await sendRequest(
              "get",
              "/properties",
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response_householdlist.status === 1) {
              setAPI_Data(response_householdlist.data);
            }
          }

          //api call for hth supervisor
          if (userRole === "hth-supervisor") {
            const response_teamworkers = await sendRequest(
              "get",
              "/team-workers",
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response_teamworkers.status === 1) {
              setAPI_Data_HS(response_teamworkers.data);
            }
          }
          // api call for VCT supervisor
          if (userRole === "vct-supervisor") {
            const response_vct = await sendRequest(
              "get",
              `/properties/vct-action`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response_vct.status === 1) {
              setAPI_DataVCT(response_vct.data);
            }
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, [userRole]);

  useEffect(() => {
    console.log("Api Data HTH Member", api_data);
    console.log("Api Data HTH Supervisor", api_data_HS);
    console.log("api data vct", api_dataVCT);
  }, [api_data, api_data_HS, api_dataVCT]);

  try {
    const routeHandler = (e) => {
      e.preventDefault();
      const value = e.target.id;
      route.push(`/home/team/${value}`);
    };

    const editHandler = (e) => {
      e.preventDefault();
      const household_id = e.target.id;
      localStorage.setItem("household_id", household_id);
      localStorage.setItem("flag", true);
      route.push("/home/householdentry");
    };

    const surveyHandler = (e) => {
      e.preventDefault();
      const household_id = e.target.id;
      localStorage.setItem("household_id", household_id);
      route.push("/home/survey");
    };

    const btnHandler = (e) => {
      e.preventDefault();
      const household_id_vct = e.target.id;
      const household_name_vct = e.target.name;
      localStorage.setItem("household_id_vct", household_id_vct);
      localStorage.setItem("household_name", household_name_vct);
      route.push("/home/survey");
    };

    const SurveyUpdateHandler = (e) => {
      e.preventDefault();
      const household_id = e.target.id;
      const household_name = e.target.name;
      localStorage.setItem("household_name", household_name);
      localStorage.setItem("household_id(survey-update)", household_id);
      route.push("/home/update-survey");
    };

    return userRole === "hth-supervisor" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
        <table className={styles.tableContainerHS}>
          <thead>
            <tr>
              <th className={styles.teamNo}>Team Number</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {api_data_HS.map((item, index) => (
              <tr key={index}>
                <td className={styles.teamNo}>{item.team.number}</td>
                <td>{item.name}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log("clicked ", item.team.number);
                      localStorage.setItem("team_id", item.team.id);
                      route.push(`/home/team/${item.team.number}`);
                    }}
                  >
                    <img
                      src="/images/hth_supervisor_team_member_file_show_icon.png"
                      alt="icon"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : userRole === "hth-member" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
        <div className={styles.teamContainer}>
          <div className={styles.searchbar}>
            <input placeholder="Search"></input>
            <Button
              variant="secondary"
              href="/home/householdentry"
              className={styles.btn}
            >
              ADD NEW
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Sl</th>
                  <th>Household</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {api_data.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className={
                          row.has_ongoing_hth_member_survey
                            ? styles.surveyDone
                            : styles.surveyNotDone
                        }
                      >
                        {row.id}
                      </td>
                      <td
                        className={
                          row.has_ongoing_hth_member_survey
                            ? styles.surveyDone
                            : styles.surveyNotDone
                        }
                      >
                        {row.name}
                      </td>
                      <td
                        className={
                          row.has_ongoing_hth_member_survey
                            ? styles.surveyDoneAction
                            : styles.surveyNotDoneAction
                        }
                      >
                        <Button
                          id={row.id}
                          variant="success"
                          onClick={(e) => {
                            if (row.has_ongoing_hth_member_survey) {
                              e.preventDefault();

                              localStorage.setItem("household_name", row.name);
                              localStorage.setItem(
                                "household_id(survey-update)",
                                row.id
                              );
                              route.push("/home/update-survey");
                            } else {
                              surveyHandler(e);
                            }
                          }}
                        >
                          Survey
                        </Button>

                        <Button
                          id={row.id}
                          variant="primary"
                          onClick={editHandler}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    ) : userRole === "vct-supervisor" ? (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
        <div className={styles.teamContainer}>
          <div className={styles.searchbar}>
            <input placeholder="Search"></input>
            <Button variant="secondary" href="#" className={styles.btn}>
              ###
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Sl</th>
                  <th>Household</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {api_dataVCT.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>
                        <Button
                          id={row.id}
                          name={row.name}
                          variant="success"
                          onClick={btnHandler}
                          // disabled={row.has_ongoing_hth_member_survey}
                        >
                          Button
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    ) : (
      <>
        <Table className={styles.tableContainer2_skeleton}>
          <thead>
            <tr>
              <th>
                <Skeleton width={200} />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width={100} />
                </td>
                <td>
                  <Skeleton width={100} />
                </td>
                <td>
                  <Skeleton width={100} />
                </td>
                <td>
                  <Skeleton width={100} />
                </td>
                <td>
                  <Skeleton width={100} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
