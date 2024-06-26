"use client";
import Footer from "@/components/prelogin/Footer";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageFetcher from "@/components/LanguageFetcher";

import axios from "axios";
import swal from "sweetalert";
import Header from "@/components/Header/Header";
import { useContext } from "react";
import RoleContext from "@/contexts/RoleContext/RoleContext";
import UserContext from "@/contexts/UserContext/UserContext";

export default function Page() {
  const [role_id, setRole_id] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role_name, setRoleName] = useState();

  const route = useRouter();
  const translate = LanguageFetcher();
  const { role, roleId } = useContext(RoleContext);
  const { setToken, setUserName } = useContext(UserContext);

  useEffect(() => {
    setRoleName(role);
  }, [role_name]);

  const loginData = {
    phone: username,
    password: password,
    role_id: roleId,
  };

  const loadingHeaderData = {
    name: role_name,
    municipality_name: "",
    team_num: "",
    ward_name: "",
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        loginData
      );
      const token = res.data.access_token;

      // localStorage.setItem("token", token);
      // localStorage.setItem("phone", username);
      setToken(token)
      swal("Successfully", "logged in", "success");
      route.push("/home/dashboard");
    } catch (error) {
      swal("Login Error", "Please enter valid credentials", "error");
    }
  };

  return (
    <>
      <Header isOffCanvasVisible={false} loadingdata={loadingHeaderData} />
      <div className={styles.loginContainer}>
        <h2>{translate?.user_login}</h2>
        <div className={styles.loginForm}>
          <span>
            <label htmlFor="username">{translate?.user_name}</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            ></input>
          </span>
          <span>
            <label htmlFor="password">{translate?.password}</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            ></input>
          </span>
          <button onClick={loginHandler}>{translate?.login}</button>
          <a href="#">
            <p>{translate?.forgot_your_password}</p>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
