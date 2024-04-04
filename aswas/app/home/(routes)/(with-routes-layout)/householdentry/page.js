"use client";
import { useState, useEffect } from "react";
import SurveyDropdown from "@/components/home/SurveyDropdown";
import Surveyques from "@/components/home/Surveyques";
import Textparser from "@/components/home/Textparser";
import styles from "./householdentry.module.css";
import { Button } from "react-bootstrap";
import LanguageFetcher from "@/components/LanguageFetcher";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import Header from "@/components/Header/Header";

export default function page() {
  // State variables
  const [token, setToken] = useState("");
  const [household, setHousehold] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [holding_number, setHoldingNumber] = useState("");
  const [aadhaar_number, setAadharNumber] = useState("");
  const [members, setMembers] = useState("");
  const [rent, setRent] = useState("0");
  const [property_type_id, setPropertyType] = useState("");
  const [private_, setPrivate_] = useState("0");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [ward_id, setWardId] = useState("");
  const [household_id, setHouseholdId] = useState("");
  const [locationString, setLocationString] = useState("");
  const [pond_no, setPond_No] = useState();
  const [pond_address, setPondAddress] = useState();

  //ohter variables
  const [userRole, setUserRole] = useState("");
  const [flag, setFlag] = useState();
  const [otherDropdownValue, setOtherDropdownValue] = useState("1");

  //Header-Loading Data States
  const [username, setUserName] = useState("");
  const [municipality_name, setMunicipality_name] = useState("");
  const [team_num, setTeam_num] = useState("");
  const [ward_name, setWard_name] = useState("");

  //Language Function Fetcher
  const translate = LanguageFetcher();

  //Router
  const route = useRouter();

  // Dropdown options
  const dropdownOption = ["Own", "Rent"];

  // Other variables

  const loadingHeaderData = {
    name: username,
    municipality_name: municipality_name,
    team_num: team_num,
    ward_name: ward_name,
  };

  const formData = {
    token: token,
    household: household,
    name: name,
    phone: phone,
    holding_number: holding_number,
    aadhaar_number: aadhaar_number,
    members: members,
    rent: rent,
    address: address,
    location: locationString,
    ward_id: ward_id,
  };

  const formDataUpdate = {
    token: token,
    household: household,
    name: name,
    phone: phone,
    holding_number: holding_number,
    aadhaar_number: aadhaar_number,
    members: members,
    rent: rent,
    address: address,
    ward_id: ward_id,
  };

  const Other_formData = {
    token: token,
    household: household,
    name: pond_no,
    holding_number: holding_number,
    property_type_id: otherDropdownValue,
    private: private_,
    address: pond_address,
    location: locationString,
  };

  const Other_formDataUpdate = {
    token: token,
    household: household,
    name: pond_no,
    holding_number: holding_number,
    property_type_id: otherDropdownValue,
    private: private_,
    address: pond_address,
    location: locationString,
  };

  const dropdownObject = {
    1: "Pond",
    2: "Drain",
    3: "Construction Site",
    4: "Tyre Resoling",
    5: "Recycling sites",
    6: "Other outdoor risk",
  };

  //Token initialzation and localstorage fetching
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await localStorage.getItem("token");
        setUserRole(localStorage.getItem("role_name"));
        setFlag(localStorage.getItem("flag"));
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
          setWardId(localStorage.getItem("ward_id"));
          const householdId = localStorage.getItem("household_id");
          setFlag(localStorage.getItem("flag"));
          const flag = localStorage.getItem("flag");

          if (flag === "true" && householdId) {
            setHouseholdId(householdId);
            //Read household by id
            const response = await sendRequest(
              "get",
              `/properties/${householdId}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 1) {
              console.log("Update response Data::", response.data);
              const data = response.data;
              setName(data.name || "");
              setPhone(data.phone || "");
              setHoldingNumber(data.holding_number || "");
              setAadharNumber(data.aadhaar_number || "");
              setMembers(data.members || "");
              setRent(String(data.rent) || "");
              setPropertyType(data.property_type_id || "");
              setAddress(data.address || "");
              setWardId(data.ward_id || "");
              setHousehold(String(data.household) || "");
              setPond_No(String(data.name) || "");
              setPondAddress(String(data.address) || "");
              setHoldingNumber(String(data.holding_number) || "");
              setPrivate_(String(data.private) || "");
              setOtherDropdownValue(String(data.property_type_id) || "");
            } else {
              swal("Error", response.msg, "error");
            }
          }
        }
      } catch (error) {
        swal("Error", error, "error");
      }
    }
    fetchData();
  }, []);

  //Location fetching
  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });

        // alert("Geolocation not available")
        setLocation(null);
      }
    };

    geolocation();
  }, []);

  useEffect(() => {
    setLocationString(`${location?.latitude},${location?.longitude}`);
  }, [location, locationString]);

  useEffect(() => {
    console.log("household", household);
    console.log("otherDropdownValue", otherDropdownValue);
    console.log("flag", flag);
  }, [household, otherDropdownValue, flag]);

  // Handler Functions
  const submitHandler = async (e) => {
    if (household === "1") {
      if (name === "" || members === "" || rent === "") {
        swal("Error", "Please fill all the fields", "error");
      } else {
        e.preventDefault();
        console.log("FormData :::", formData);
        try {
          //API call parameters set
          let endpoint = "/properties";
          let method = "post";
          let data = formData;

          // API SWITCHING BETWEEN PUT OR POST

          //Update Household
          if (flag === "true") {
            endpoint += `/${household_id}`;
            method = "put";
            data = formDataUpdate;
          }
          //API call -- Create household

          const householdEntry_response = await sendRequest(
            method,
            endpoint,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //API Response
          if (householdEntry_response.status === 1) {
            console.log("response after update", householdEntry_response.data);
            localStorage.removeItem("flag");
          }
        } catch (error) {
          swal("Error", error.message, "error");
        }

        route.push("/home/team");
      }
    }
    if (household === "0") {
      if (pond_no === "" || pond_address === "" || holding_number === "") {
        swal("Error", "Please fill all the fields", "error");
      } else {
        e.preventDefault();
        console.log("OtherFormData :::", Other_formData);
        try {
          //API call parameters set
          let endpoint = "/properties";
          let method = "post";
          let data = Other_formData;

          // API SWITCHING BETWEEN PUT OR POST

          //Update Other Household
          if (flag === "true") {
            endpoint += `/${household_id}`;
            method = "put";
            data = Other_formDataUpdate;
          }
          //API call -- Create household

          const OtherhouseholdEntry_response = await sendRequest(
            method,
            endpoint,
            Other_formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //API Response
          if (OtherhouseholdEntry_response.status === 1) {
            console.log(
              "Other household response after update",
              OtherhouseholdEntry_response.data
            );
            localStorage.removeItem("flag");
          }
        } catch (error) {
          swal("Error", error.message, "error");
        }

        route.push("/home/team");
      }
    }
  };

  const handleVal = (id, val) => {
    console.log("ID:", id);
    console.log("Value:", val);

    // if (id === "ward") {
    //   setWardId(val);
    // }
    if (id === "household_name") {
      setName(String(val));
    }
    if (id === "aadhar") {
      setAadharNumber(String(val) || "");
    }
    if (id === "phone") {
      setPhone(String(val) || "");
    }
    if (id === "family_members") {
      setMembers(String(val));
    }
    if (id === "ownertype") {
      if (val === "Rent") {
        setRent("1");
      }
      if (val === "Own") {
        setRent("0");
      }
    }
    if (id === "holding_number") {
      setHoldingNumber(String(val) || "");
    }
    if (id === "pond_no") {
      setPond_No(String(val) || "");
    }
    if (id === "pond_address") {
      setPondAddress(String(val) || "");
    }
  };

  const handleOtherDropdown = (e) => {
    console.log(e.target.value);
    setOtherDropdownValue(e.target.value);
  };

  const handlehouseholdDropdown = (e) => {
    console.log(e.target.value);
    setRent(e.target.value);
  };

  return (
    (
      <>
        <Header
          userRole={userRole}
          isOffCanvasVisible={false}
          loadingdata={loadingHeaderData}
        />
        <div className={styles.householdentrycontainer}>
          <div className={styles.householdType}>
            <span>
              <input
                id="household"
                type="radio"
                value={"1"}
                name="household"
                checked={household === "1"}
                className={styles.householdBtn}
                onChange={(e) => setHousehold(e.target.value)}
              />
              <label
                htmlFor="household"
                className={
                  household === "1"
                    ? styles.householdBtnLabelChecked
                    : styles.householdBtnLabel
                }
              >
                Household
              </label>
            </span>

            <span>
              <input
                id="other"
                type="radio"
                value={"0"}
                checked={household === "0"}
                name="household"
                className={styles.householdBtn}
                onChange={(e) => setHousehold(e.target.value)}
              />
              <label
                htmlFor="other"
                className={
                  household === "0"
                    ? styles.householdBtnLabelChecked
                    : styles.householdBtnLabel
                }
              >
                Other
              </label>
            </span>
          </div>

          {household === "1" ? (
            <>
              <div className={styles.titlebar}>
                <Textparser
                  text={
                    flag === "true"
                      ? "Update Householde Entry"
                      : "New Household Entry"
                  }
                />
                <Textparser
                  text={`latitude:${location?.latitude}, longitude:${location?.longitude}`}
                />
              </div>
              <Surveyques
                id="household_name"
                value={name}
                labelText={translate?.household_name}
                handleVal={handleVal}
              />
              <Surveyques
                id="aadhar"
                value={aadhaar_number}
                labelText={translate?.aadhar_no}
                handleVal={handleVal}
              />
              <Surveyques
                id="phone"
                value={phone}
                labelText={translate?.mobile_no}
                handleVal={handleVal}
              />
              <Surveyques
                id="family_members"
                value={members}
                labelText={translate?.family_members}
                handleVal={handleVal}
              />
              <SurveyDropdown
                id="ownertype"
                labelText={translate?.owner_type}
                options={dropdownOption}
                handleVal={(id, val) => {
                  handleVal(id, val);
                }}
                value={rent === "1" ? "Rent" : "Own"}
              />

              {/* <div className={styles.ownerTypeDropdown}>
                <label htmlFor="ownerType">Owner Type:</label>
                <select
                  id="ownerType"
                  name="ownerType"
                  onChange={(e) => handleVal(e.target.id, e.target.value)}
                // value={rent}
                >
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                </select>
              </div> */}

              <Surveyques
                id={"holding_number"}
                value={holding_number}
                labelText={translate?.holding_number}
                handleVal={handleVal}
              />
            </>
          ) : (
            //Other Households
            <>
              <div className={styles.titlebar}>
                <Textparser text={"Other Details"} />
              </div>

              <div className={styles.otherDropdown}>
                <label htmlFor="place"></label>
                <select
                  id="place"
                  name="place"
                  onChange={handleOtherDropdown}
                  value={otherDropdownValue}
                >
                  {Object.entries(dropdownObject).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <Surveyques
                id="pond_no"
                value={pond_no}
                labelText={translate?.pond_no}
                handleVal={handleVal}
              />
              <Surveyques
                id="pond_address"
                value={pond_address}
                labelText={translate?.pond_address}
                handleVal={handleVal}
              />
              <Surveyques
                id="holding_number"
                value={holding_number}
                labelText={translate?.holding_number}
                handleVal={handleVal}
              />

              <div className={styles.otherPropertyType}>
                <span>
                  <input
                    id="private"
                    type="radio"
                    name="propType"
                    value={"1"}
                    onChange={(e) => {
                      setPrivate_(e.target.value);
                    }}
                    checked={private_ === "1"}
                  ></input>
                  <label htmlFor="private">Private</label>
                </span>
                <span>
                  <input
                    id="public"
                    type="radio"
                    name="propType"
                    value={"0"}
                    onChange={(e) => {
                      setPrivate_(e.target.value);
                    }}
                    checked={private_ === "0"}
                  ></input>
                  <label htmlFor="public">Public</label>
                </span>
              </div>

              <Surveyques
                id="Latitude"
                value={location.latitude}
                labelText={translate?.Lat}
                handleVal={handleVal}
                disabled={true}
              />

              <Surveyques
                id="Longitude"
                value={location.longitude}
                labelText={translate?.Long}
                handleVal={handleVal}
                disabled={true}
              />
            </>
          )}

          <Button variant="success" onClick={submitHandler}>
            {flag === "true" ? "Update" : "Submit"}
          </Button>
        </div>
      </>
    ) || (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Skeleton height={20} width={"100%"} />
          </div>
          <div className={styles.SkeletonContainer}>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={20} width={"100%"} />
            </span>
            <span>
              <Skeleton height={30} width={150} />
            </span>
          </div>
        </div>
      </>
    )
  );
}
