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
    // const [apiData, setApiData] = useState([]);

    const data = [
      { round: 1, date: "2022-04-24 To 2022-04-25", action: "Completed" },
      { round: 2, date: "2022-05-01 To 2022-05-02", action: "Completed" },
      { round: 3, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
      { round: 4, date: "2022-05-01 To 2022-05-02", action: "Upcoming" },
    ];

    // sendRequest("get", api).then((data) => {
    //   setApiData(data.data);
    // });

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

      <>
        <DynamicTable dataArray={apiData} />
      </>
    ) : userRole === "vct-member" ? (
      <>
        <div className={styles.vct_mem_teamContainer}>
          <input placeholder="Auto Search"></input>
          <div className={styles.vct_mem_tableContainer}>
            <Table>
              <thead className={styles.vct_mem_tableHead}>
                <tr>
                  <th>Sl</th>
                  <th>Household</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{row.round}</td>
                      <td>{row.household}</td>
                      <td className={styles.vct_mem_actionVct}>
                        <a href="/home/survey">
                          <img src="/images/vct_household_item_icon.png"></img>
                        </a>

                        <a href="#">
                          <img src="/images/hth_supervisor_team_member_location_icon.png"></img>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    ) : userRole === "hth-supervisor" ? (
      <>
        <div className={styles.text}>
          <Textparser text={"this is a dummy text"} />
        </div>

        <div className={styles.tableContainer}>
          <Table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Round</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {data.map((row, index) => {
                const { action } = row;
                let classname;
                if (action === "Completed") {
                  classname = styles.hthSupervisorCompleted;
                }
                // if (action === "On Going") {
                //   classname = styles.ongoing;
                // }
                if (action === "Upcoming") {
                  classname = styles.hthSupervisorUpcoming;
                }
                return (
                  <tr key={index}>
                    <td className={classname}>{row.round}</td>
                    <td
                      className={classname}
                      onClick={() => {
                        route.push("/home/team");
                      }}
                    >
                      {row.date}
                    </td>
                    <td className={classname}>{row.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    ) : (
      // <><DynamicTable dataArray={apiData} /></>
      <> userRole === " ??? " </>
    );
  } catch (error) {
    console.log(error);
  }
}
