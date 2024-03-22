"use client";

import { Row, Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
import swal from "sweetalert";

export default function homelayout({ children }) {
  const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(true);
  const [userRole, setUserRole] = useState("");

  const route = useRouter();
  // setUserRole(LocalStorageFetcher({ keyName: "role" }));

  useEffect(() => {
    setUserRole(localStorage.getItem("role_name"));
    // console.log("in layout role is", userRole);
  }, [userRole]);

  return (
    <>
      <div className={styles.body}>{children}</div>
    </>
  );
}
