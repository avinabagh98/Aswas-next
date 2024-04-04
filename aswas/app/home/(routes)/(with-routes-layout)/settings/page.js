"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";
import Checkbutton from "@/components/role-lang/Checkbutton";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  const [name, setName] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");

  //Header-Loading Data States
  const [username, setUserName] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [team_num, setTeam_num] = useState("");
  const [ward_name, setWard_name] = useState("");

  const loadingHeaderData = {
    name: username,
    municipality_name: municipality_name,
    team_num: team_num,
    ward_name: ward_name,
  };

  //Handler Functions
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  useEffect(() => {
    setName(localStorage.getItem("phone"));
    if (radioValue) {
      console.log(radioValue);
    }
  }, [radioValue, name]);

  // //Token initialzation and localstorage fetching
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await localStorage.getItem("token");
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
          setUserName(name_local);
          setMunicipality_name(municipality_name_local);
          setTeam_num(team_num_local);
          setWard_name(ward_name_local);

          setToken(localStorage.getItem("token"));
        }
      } catch (error) {
        swal("Error", error.message, "error");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header
        userRole={userRole}
        isOffCanvasVisible={false}
        loadingdata={loadingHeaderData}
      />
      <div className={styles.settingsContainer}>
        <h3 className="text-decoration-none "> NAME: {name}</h3>
        <div>
          <h3>CHANGE LANGUAGE</h3>
          <Checkbutton
            handleRadioChange={handleRadioChange}
            radioValue={radioValue}
          />
        </div>
        <div className={styles.passwordContainer}>
          <h3>CHANGE PASSWORD</h3>
          <span>
            <label htmlFor="oldpassword">OLD PASSWORD</label>
            <input type="password" id="oldpassword"></input>
          </span>

          <span>
            <label htmlFor="newpassword"> NEW PASSWORD</label>
            <input type="password" id="newpassword"></input>
          </span>
        </div>
        <a href="/home/schedule">
          <button>UPDATE</button>
        </a>
      </div>
    </>
  );
}
