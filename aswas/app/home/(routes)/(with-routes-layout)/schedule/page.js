"use client";

import { useState, useEffect } from "react";
import Textparser from "@/components/home/Textparser";
import styles from "./schedule.module.css";
import { Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/api/sendRequest";
import DynamicTable from "@/components/DynamicTable/Dynamictable";
import LocalStorageFetcher from "@/components/LocalStorageFetcher";
export default function page() {

  const api = "https://jsonplaceholder.typicode.com/posts";
  try {

    const userRole = LocalStorageFetcher({ keyName: "role" });
    const language = LocalStorageFetcher({ keyName: "language" });
    const [apiData, setApiData] = useState([]);

    // const data = [
    //   { round: 1, date: "2022-04-24 To 2022-04-25", action: "Completed" },
    //   { round: 2, date: "2022-05-01 To 2022-05-02", action: "Completed" },
    //   { round: 3, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    //   { round: 4, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    // ];



    sendRequest("get", api).then((data) => {
      setApiData(data.data)
    })

    const route = useRouter();

    return userRole === "hth-member" ? (
      // <>
      //   <div className={styles.text}>
      //     <Textparser text={"this is a dummy text"} />
      //   </div>

      //   <div className={styles.tableContainer}>
      //     <Table>
      //       <thead className={styles.tableHead}>
      //         <tr>
      //           <th>Round</th>
      //           <th>Date</th>
      //           <th>Action</th>
      //         </tr>
      //       </thead>
      //       <tbody className={styles.tableBody}>
      //         {data.map((row, index) => {
      //           const { action } = row;
      //           let classname;
      //           if (action === "Completed") {
      //             classname = styles.completed;
      //           }
      //           if (action === "On Going") {
      //             classname = styles.ongoing;
      //           }
      //           if (action === "Upcoming") {
      //             classname = styles.upcoming;
      //           }
      //           return (
      //             <tr key={index}>
      //               <td className={classname}>{row.round}</td>
      //               <td
      //                 className={classname}
      //                 onClick={() => {
      //                   route.push("/home/team");
      //                 }}
      //               >
      //                 {row.date}
      //               </td>
      //               <td className={classname}>{row.action}</td>
      //             </tr>
      //           );
      //         })}
      //       </tbody>
      //     </Table>
      //   </div>
      // </>

      <><DynamicTable dataArray={apiData} /></>
    ) : userRole === "vct-member" ? (
      <>
        <Table className={styles.tableContainer2}>
          <thead>
            <tr>
              <th>TEAM LIST</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Team1</td>
              <td>Team2</td>
              <td>Team3</td>
              <td>Team4</td>
              <td>Team5</td>
            </tr>
          </tbody>
        </Table>
      </>
    ) : userRole === "hth-supervisor" ? (
      // <>
      //   <div className={styles.text}>
      //     <Textparser text={"this is a dummy text"} />
      //   </div>

      //   <div className={styles.tableContainer}>
      //     <Table>
      //       <thead className={styles.tableHead}>
      //         <tr>
      //           <th>Round</th>
      //           <th>Date</th>
      //           <th>Action</th>
      //         </tr>
      //       </thead>
      //       <tbody className={styles.tableBody}>
      //         {data.map((row, index) => {
      //           const { action } = row;
      //           let classname;
      //           if (action === "Completed") {
      //             classname = styles.hthSupervisorCompleted;
      //           }
      //           // if (action === "On Going") {
      //           //   classname = styles.ongoing;
      //           // }
      //           if (action === "Upcoming") {
      //             classname = styles.hthSupervisorUpcoming;
      //           }
      //           return (
      //             <tr key={index}>
      //               <td className={classname}>{row.round}</td>
      //               <td
      //                 className={classname}
      //                 onClick={() => {
      //                   route.push("/home/team");
      //                 }}
      //               >
      //                 {row.date}
      //               </td>
      //               <td className={classname}>{row.action}</td>
      //             </tr>
      //           );
      //         })}
      //       </tbody>
      //     </Table>
      //   </div>
      // </>
      <><DynamicTable dataArray={apiData} /></>
    ) : (
      <> userRole === " ??? " </>
    );
  } catch (error) {
    console.log(error);
  }
}
