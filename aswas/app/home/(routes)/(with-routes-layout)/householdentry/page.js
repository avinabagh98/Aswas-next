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
  const [private_, setPrivate_] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [ward_id, setWardId] = useState("");
  const [household_id, setHouseholdId] = useState("");
  const [locationString, setLocationString] = useState("");
  const [pond_no, setPond_No] = useState();
  const [pond_address, setPondAddress] = useState();

  //ohter variables
  const [userRole, setUserRole] = useState("");
  const [flag, setFlag] = useState(false);
  const [otherDropdownValue, setOtherDropdownValue] = useState("1");
  //Language Function Fetcher
  const translate = LanguageFetcher();

  //Router
  const route = useRouter();

  // Dropdown options
  const dropdownOption = ["Own", "Rent"];

  // Other variables

  const formData = {
    token: token,
    household: household,
    name: name,
    phone: phone,
    holding_number: holding_number,
    aadhaar_number: aadhaar_number,
    members: members,
    rent: rent,
    property_type_id: property_type_id,
    private_: private_,
    address: address,
    location: locationString,
    ward_id: ward_id,
  };

  const Other_formData = {
    token: token,
    household: household,
    name: pond_no,
    holding_number: holding_number,
    property_type_id: property_type_id,
    private_: private_,
    address: pond_address,
    location: locationString,
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
    property_type_id: property_type_id,
    private_: private_,
    address: address,
    ward_id: ward_id,
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
        if (!token) {
          route.push("/home/login");
        } else {
          setToken(localStorage.getItem("token"));
          setWardId(localStorage.getItem("ward_id"));
          const householdId = localStorage.getItem("household_id");
          setFlag(localStorage.getItem("flag"));
          const flag = localStorage.getItem("flag");

          if (flag && householdId) {
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
              setRent(data.rent || "");
              setPropertyType(data.property_type_id || "");
              setPrivate_(data.private_ || "");
              setAddress(data.address || "");
              setWardId(data.ward_id || "");
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
  }, [household, otherDropdownValue]);

  // Handler Functions
  const submitHandler = async (e) => {
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
        if (flag) {
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
  };

  const handleVal = (id, val) => {
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

  return (
    (
      <>
        <Header userRole={userRole} isOffCanvasVisible={false} />
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
                    flag ? "Update Householde Entry" : "New Household Entry"
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
                value={rent}
                labelText={translate?.owner_type}
                options={dropdownOption}
                handleVal={handleVal}
              />
              <Surveyques
                id={"holding_number"}
                value={holding_number}
                labelText={translate?.holding_number}
                handleVal={handleVal}
              />
            </>
          ) : (
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
            {flag ? "Update" : "Submit"}
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
