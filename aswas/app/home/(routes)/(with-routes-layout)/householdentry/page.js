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
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";

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

  //ohter variables
  const [flag, setFlag] = useState(false);
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

  //Token initialzation and localstorage fetching
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await localStorage.getItem("token");
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
  };

  return (
    (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Textparser
              text={flag ? "Update Householde Entry" : "New Household Entry"}
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
            value={rent === "1" ? "Rent" : "Own"}
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
