import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./team.module.css";
import { Table, Button } from "react-bootstrap";

const CustomLoading = () => {
  // Simulate a role for demonstration purposes
  const userRole = "hth-supervisor"; // or 'hth-member'

  return (
    <>
      <>
        <div className={styles.teamContainer}>
          <div className={styles.searchbar}>
            <Skeleton width={300} height={30} />
            <Skeleton width={80} height={30} />
          </div>

          <div className={styles.tableContainer}>
            <Table>
              <thead className={styles.tableHead}>
                <tr>
                  <th></th>
                  <th></th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={50} />
                    </td>
                    <td>
                      <Skeleton width={200} />
                    </td>
                    <td className="d-flex gap-2 justify-content-center">
                      <Button variant="success">
                        <Skeleton width={60} />
                      </Button>
                      <Button variant="primary">
                        <Skeleton width={60} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    </>
  );
};

export default CustomLoading;
