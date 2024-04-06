"use client";

import styles from "./dashboard.module.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import LanguageFetcher from "@/components/LanguageFetcher";
import SingleButton from "@/components/home/SingleButton";
import Header from "@/components/Header/Header";
import { sendRequest } from "@/api/sendRequest";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file
import UserContext from "@/contexts/UserContext/UserContext";
import RoleContext from "@/contexts/RoleContext/RoleContext";

export default function page() {
  const route = useRouter();
  const translate = LanguageFetcher();
  const { token, userName, setUserName, municipalityName, setMunicipalityName } = useContext(UserContext);
  const { role } = useContext(RoleContext);

  //State Variables

  const [userRole, setUserRole] = useState(null);
  // const [name, setName] = useState("");
  // const [municipality_name, setMunicipality_name] = useState("");
  // const [team_num, setTeam_num] = useState("");
  // const [ward_name, setWard_name] = useState("");

  //other state variables
  const [api_data_userDetails, setAPI_Data_userDetails] = useState([]);

  const loadingHeaderData = {
    name: userName,
    municipality_name: municipalityName,
    team_num: "team_num",
    ward_name: "ward_name",
  };

  //Token Fetching
  useEffect(() => {
    try {
      async function fetchData() {
        if (!token) {
          route.push("/home/login");
        } else {
          setUserRole(role);
          // setToken(token);

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
            // console.log("User Details Response ::", user_details_response.data);
            setAPI_Data_userDetails(user_details_response.data);
          }
        }
      }
      fetchData();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  }, []);

  //API Data Showing and LocalStorage Storing && State variable updating for Header
  useEffect(() => {
    if (api_data_userDetails && Object.keys(api_data_userDetails).length > 0) {
      // localStorage.setItem("user_id", api_data_userDetails.id);
      // localStorage.setItem("team_id", api_data_userDetails.team_id);
      // localStorage.setItem("name", api_data_userDetails.name);
      setUserName(api_data_userDetails.name)
      // setName(api_data_userDetails.name);
    }

    // if (api_data_userDetails.ward) {
    //   localStorage.setItem("ward_id", api_data_userDetails.ward.id);
    //   localStorage.setItem("ward_name", api_data_userDetails.ward.name);
    //   setWard_name(api_data_userDetails.ward.name);
    // }

    // if (api_data_userDetails.team) {
    //   localStorage.setItem("team_number", api_data_userDetails.team.number);
    //   setTeam_num(api_data_userDetails.team.number);
    // }

    if (api_data_userDetails.municipality) {
      // localStorage.setItem(
      //   "municipality_id",
      //   api_data_userDetails.municipality.id
      // );
      // localStorage.setItem(
      //   "municipality_name",
      //   api_data_userDetails.municipality.name
      // );

      setMunicipalityName(api_data_userDetails.municipality.name)
    }

    console.log("Header loading data::", loadingHeaderData);
  }, [api_data_userDetails, municipalityName]);

  //Handler Functions
  const handleDailySurveyBtn = (e) => {
    e.preventDefault();
    route.push("/home/dailysurveyreport");
  };

  const handleSingleBtn = (e) => {
    e.preventDefault();
    route.push("/home/schedule");
  };

  return userRole === "hth-member" ? (
    <>
      <Header
        userRole={userRole}
        isOffCanvasVisible={true}
        loadingdata={loadingHeaderData}
      />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" onClick={handleSingleBtn} />

      </div>
    </>
  ) : userRole === "hth-supervisor" ? (
    <>
      <Header
        userRole={userRole}
        isOffCanvasVisible={true}
        loadingdata={loadingHeaderData}
      />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" onClick={handleSingleBtn} />
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
      <Header
        userRole={userRole}
        isOffCanvasVisible={true}
        loadingdata={loadingHeaderData}
      />
      <div className={styles.dailySurveyBtn}>
        <SingleButton btnText="Schedule" onClick={handleSingleBtn} />
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
