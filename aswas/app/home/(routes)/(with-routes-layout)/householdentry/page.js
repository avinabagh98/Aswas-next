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

export default function page() {

  const router = useRouter();

  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        // alert("Geolocation not available")
        setLocation(null);
      }
    };

    geolocation();
  }, []);


  // State variables
  const [token, setToken] = useState("");
  const [household, setHousehold] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [holding_number, setHoldingNumber] = useState("");
  const [aadhaar_number, setAadharNumber] = useState("");
  const [members, setMembers] = useState("");
  const [rent, setRent] = useState("");
  const [property_type_id, setPropertyType] = useState("");
  const [private_, setPrivate_] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [ward_id, setWardId] = useState("");

  //Language Function Fetcher
  const translate = LanguageFetcher();
  // Dropdown options
  const ward_options = ["Choose", "Option 1", "Option 2", "Option 3"];
  const option2 = ["Select", "Own", "Rent"];

  // Other variables
  const formData = {
    token,
    household,
    name,
    phone,
    holding_number,
    aadhaar_number,
    members,
    rent,
    property_type_id,
    private_,
    address,
    location,
    ward_id
  };

  //Functions
  const submitHandler = (e) => {
    if (name === "" || members === "" || rent === "") {
      swal("Error", "Please fill all the fields", "error");
    }
    else {
      e.preventDefault();

      router.push("/home/householdlist");
    }


  };

  const handleVal = (id, val) => {
    // if (id === "ward") {
    //   setWardId(val);
    // }
    if (id === "household_name") {
      setName(val);
    }
    if (id === "aadhar") {
      setAadharNumber(val);
    }
    if (id === "phone") {
      setPhone(val);
    }
    if (id === "family_members") {
      setMembers(val);
    }
    if (id === "ownertype") {
      setRent(val);
    }
    if (id === "holding_number") {
      setHoldingNumber(val);
    }
  };

  return (
    (
      <>
        <div className={styles.householdentrycontainer}>
          <div className={styles.titlebar}>
            <Textparser text={"New Households Entry"} />
          </div>

          <Surveyques
            id="household_name"
            labelText={translate?.household_name}
            handleVal={handleVal}
          />
          <Surveyques
            id="aadhar"
            labelText={translate?.aadhar_no}
            handleVal={handleVal}
          />
          <Surveyques
            id="phone"
            labelText={translate?.mobile_no}
            handleVal={handleVal}
          />
          <Surveyques
            id="family_members"
            labelText={translate?.family_members}
            handleVal={handleVal}
          />
          <SurveyDropdown
            id={"ownertype"}
            labelText={translate?.owner_type}
            numberOfOptions={3}
            options={option2}
            handleVal={handleVal}
          />
          <Surveyques
            id={"holding_number"}
            labelText={translate?.holding_number}
            handleVal={handleVal}
          />
          <Button variant="success" onClick={submitHandler}>
            SUBMIT
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
