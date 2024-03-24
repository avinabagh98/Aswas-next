"use client";

import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LanguageFetcher from "@/components/LanguageFetcher";
import SingleButton from "@/components/home/SingleButton";
import Header from "@/components/Header/Header";
import { sendRequest } from "@/api/sendRequest";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file

export default function page() {
  const route = useRouter();
  const translate = LanguageFetcher();

  //State Variables
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState(null);

  //other state variables
  const [api_data_userDetails, setAPI_Data_userDetails] = useState([]);

  //Token Fetching

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

  //API Data Showing and LocalStorage Storing
  useEffect(() => {
    console.log("User Details Api Response::", api_data_userDetails);
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
  }, [api_data_userDetails]);

  //Handler Functions
  const handleDailySurveyBtn = (e) => {
    e.preventDefault();
    route.push("/home/dailysurveyreport");
  };

  return userRole === "hth-member" ? (
    <>
      <Header userRole={userRole} isOffCanvasVisible={true} />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" href={"/home/schedule"} />
      </div>
    </>
  ) : userRole === "hth-supervisor" ? (
    <>
      <Header userRole={userRole} isOffCanvasVisible={true} />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" href={"/home/schedule"} />
      </div>

      <div>
        <SingleButton
          btnText="Daily Survey Report"
          href={"/home/dailysurveyreport"}
          onClick={handleDailySurveyBtn}
        />
      </div>
    </>
  ) : userRole === "vct-supervisor" ? (
    <>
      <Header userRole={userRole} isOffCanvasVisible={true} />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" href={"/home/schedule"} />
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
      <div className={styles.headerContentSkeleton}>
        {/* Skeleton loader for header */}
        <Skeleton
          height={60}
          width={"100%"}
          enableAnimation={false}
          borderRadius={"0"}
        />
        <Skeleton
          height={40}
          width={"100%"}
          enableAnimation={false}
          borderRadius={"0"}
        />
      </div>

      <div className={styles.btnSkeleton}>
        {/* Skeleton loader for header */}
        <Skeleton height={60} width={300} />
        <Skeleton height={60} width={300} />
      </div>
    </>
  );
}
