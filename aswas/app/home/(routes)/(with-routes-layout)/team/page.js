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
  const route = useRouter();

  useEffect(() => {
    const team_id = localStorage.getItem("team_id");
    try {
      async function fetchData() {
        const token = await localStorage.getItem("token");
        if (!token) {
          route.push("/home/login");
        }
        else {
          setUserRole(localStorage.getItem("role_name"));
          setToken(token);
          const response = await sendRequest('get', '/properties', null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status === 1) {
            console.log("response", response.data);
            setAPI_Data(response.data);
            console.log(api_data);
          }
          else {
            swal("Error", response.msg, "error");
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
  }, [api_data]);


  try {
    const routeHandler = (e) => {
      e.preventDefault();
      const value = e.target.id;
      route.push(`/home/team/${value}`);
    };

    // const data = [
    //   { round: 1, household: "Kamal Deb Nath" },
    //   { round: 2, household: "Arun Naskar" },
    //   { round: 3, household: "Kamal Deb Nath" },
    //   { round: 4, household: "Kamal Deb Nath" },
    //   { round: 5, household: "Kamal Deb Nath" },
    //   { round: 6, household: "Kamal Deb Nath" },
    //   { round: 7, household: "Kamal Deb Nath" },
    //   { round: 8, household: "Kamal Deb Nath" },
    //   { round: 9, household: "Kamal Deb Nath" },
    //   { round: 10, household: "Kamal Deb Nath" },
    // ];

    const data = api_data;

    return userRole === "hth-supervisor" ? (
      <>
        <Table className={styles.tableContainer2}>
          <thead>
            <tr>
              <th>TEAM WORKING DETAILS</th>
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
                        <Button variant="success" href="/home/survey">
                          Survey
                        </Button>
                        <Button href="/home/householdentry" variant="primary">
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
