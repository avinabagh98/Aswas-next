"use client";

import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./TeamNum.module.css";
import { useTeam } from '@/context/TeamContext'; //
import { useRouter } from "next/navigation";


export default function page({ params }) {

  const route = useRouter();
  const { teamNumber, setTeamNumber } = useTeam(); //

  const clickHandler = (e) => {
    e.preventDefault();
    setTeamNumber(params.TeamNo);
    console.log("clicked");
    route.push('/home/householdlist')

  };

  return (
    <>
      <h1>testing {teamNumber}</h1>
      <Table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Team member</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{params.TeamNo}</td>
            <td>Kamal Debnath</td>
            <td className="d-flex justify-content-center  align-items-center gap-3">
              <button onClick={clickHandler}>
                <img
                  src="/images/hth_supervisor_team_member_file_show_icon.png"
                  alt="icon"
                />
              </button>

              <a href="#">
                <img
                  src="/images/hth_supervisor_team_member_location_icon.png"
                  alt="icon"
                ></img>
              </a>
            </td>
          </tr>

          <tr>
            <td>{params.TeamNo}</td>
            <td>Kamal Debnath</td>
            <td className="d-flex justify-content-center  align-items-center gap-3">
              <a href="#">
                <img
                  src="/images/hth_supervisor_team_member_file_show_icon.png"
                  alt="icon"
                ></img>
              </a>
              <a href="#">
                <img
                  src="/images/hth_supervisor_team_member_location_icon.png"
                  alt="icon"
                ></img>
              </a>
            </td>
          </tr>

          <tr>
            <td>{params.TeamNo}</td>
            <td>Kamal Debnath</td>
            <td className="d-flex justify-content-center  align-items-center gap-3">
              <a href="#">
                <img
                  src="/images/hth_supervisor_team_member_file_show_icon.png"
                  alt="icon"
                ></img>
              </a>
              <a href="#">
                <img
                  src="/images/hth_supervisor_team_member_location_icon.png"
                  alt="icon"
                ></img>
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
