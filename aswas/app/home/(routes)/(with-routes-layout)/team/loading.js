import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomLoading = () => {
  // Simulate a role for demonstration purposes
  const userRole = "hth-supervisor"; // or 'hth-member'

  return (
    <div
      className={
        userRole === "hth-supervisor" ? "table-container" : "team-container"
      }
    >
      {userRole === "hth-supervisor" ? (
        <table className="table">
          <thead>
            <tr>
              <th>
                <Skeleton height={20} width={200} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton height={20} width={150} />
              </td>
              <td>
                <Skeleton height={20} width={150} />
              </td>
              {/* Add more skeleton rows if needed */}
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="team-list">
          <div className="search-bar">
            <Skeleton height={40} width={"80%"} />
            <Skeleton height={40} width={100} />
          </div>
          <div className="table-container">
            <table className="table">
              {/* Define skeleton for table rows and columns */}
              <thead>
                <tr>
                  <th>
                    <Skeleton height={20} width={50} />
                  </th>
                  <th>
                    <Skeleton height={20} width={150} />
                  </th>
                  <th className="text-center">
                    <Skeleton height={20} width={100} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat skeleton rows based on the expected data */}
                <tr>
                  +
                  <td>
                    <Skeleton height={20} width={50} />
                  </td>
                  <td>
                    <Skeleton height={20} width={150} />
                  </td>
                  <td className="text-center">
                    <Skeleton height={30} width={100} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomLoading;
