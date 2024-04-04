"use client";

import { useEffect, useState } from "react";
import styles from "./team.module.css";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header/Header";
import Textparser from "@/components/home/Textparser";

export default function page() {
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();
  const [api_data, setAPI_Data] = useState([]);
  const [api_data_HS, setAPI_Data_HS] = useState([]);
  const [api_dataVCT, setAPI_DataVCT] = useState([]);
  const [api_dataVCT_household, setAPI_DataVCT_Household] = useState([]);
  const [round, setRound] = useState(null);
  const route = useRouter();
  //Header-Loading Data States
  const [name, setName] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [team_num, setTeam_num] = useState("");
  const [ward_name, setWard_name] = useState("");

  const loadingHeaderData = {
    name: name,
    municipality_name: municipality_name,
    team_num: team_num,
    ward_name: ward_name,
  };

  //Localstorage and Token fetching
  useEffect(() => {
    localStorage.removeItem("flag");
    localStorage.removeItem("household_id(survey-update)");
    localStorage.removeItem("household_name");
    localStorage.removeItem("IsSurveyDone");

    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        // const roundNo = localStorage.getItem("round");
        if (!token) {
          route.push("/home/login");
        } else {
          //Initite states with local storage data
          const name_local = await localStorage.getItem("name");
          const municipality_name_local = await localStorage.getItem(
            "municipality_name"
          );
          const team_num_local = await localStorage.getItem("team_num");
          const ward_name_local = await localStorage.getItem("ward_name");
          setUserRole(localStorage.getItem("role_name"));
          setName(name_local);
          setMunicipality_name(municipality_name_local);
          setTeam_num(team_num_local);
          setWard_name(ward_name_local);

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

            const response_householdData = await sendRequest(
              "get",
              `/properties/${localStorage.getItem("household_id_vct")}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response_householdData.status === 1) {
              console.log("VCT_household_data", response_householdData.data);
              setAPI_DataVCT_Household(response_householdData.data);
            }
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, [userRole]);

  useEffect(() => {}, [api_data, api_data_HS, api_dataVCT]);

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
      localStorage.setItem("flag", "true");
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
      localStorage.setItem("team_id", api_dataVCT_household?.team_id);
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

    const addnewHandler = (e) => {
      e.preventDefault();
      localStorage.setItem("flag", "false");
      route.push("/home/householdentry");
    };

    return userRole === "hth-supervisor" ? (
      <>
        <Header
          userRole={userRole}
          isOffCanvasVisible={false}
          loadingdata={loadingHeaderData}
        />
        <div className={styles.Pagetext}>
          <Textparser text="Team Work Details" />
        </div>
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
                <td className={styles.HSteamNo}>{item.team.number}</td>
                <td>{item.name}</td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      localStorage.setItem("team_id", item.team.id);
                      route.push("/home/householdlist");
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
        <Header
          userRole={userRole}
          isOffCanvasVisible={false}
          loadingdata={loadingHeaderData}
        />
        <div className={styles.Pagetext}>
          <Textparser text="Team Work Details" />
        </div>
        <div className={styles.teamContainer}>
          <div className={styles.searchbar}>
            <input placeholder="Search"></input>
            <Button
              variant="secondary"
              onClick={addnewHandler}
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
                              localStorage.setItem(
                                "IsSurveyDone",
                                row.has_ongoing_hth_member_survey
                              );
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
        <Header
          userRole={userRole}
          isOffCanvasVisible={false}
          loadingdata={loadingHeaderData}
        />

        <div className={styles.Pagetext}>
          <Textparser text="Team Work Details" />
        </div>

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
