"use client";

import { useEffect, useState } from "react";
import styles from "./team.module.css";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function page() {
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();
  const [api_data, setAPI_Data] = useState([]);
  const [api_data_HS, setAPI_Data_HS] = useState([]);
  const route = useRouter();

  //Localstorage and Token fetching
  useEffect(() => {
    const team_id = localStorage.getItem("team_id");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);
          //api call for hth mem
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

          //api call for hth supervisor
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
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  useEffect(() => {
    console.log(api_data);
    console.log(api_data_HS);
  }, [api_data, api_data_HS]);

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
      route.push("/home/householdentry");
    };

    const surveyHandler = (e) => {
      e.preventDefault();
      const household_id = e.target.id;
      localStorage.setItem("household_id", household_id);
      route.push("/home/survey");
    };
    const data = api_data;

    return userRole === "hth-supervisor" ? (
      <>
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
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td className="d-flex gap-2 justify-content-center ">
                        <Button
                          id={row.id}
                          variant="success"
                          onClick={surveyHandler}
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
            </Table>
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
