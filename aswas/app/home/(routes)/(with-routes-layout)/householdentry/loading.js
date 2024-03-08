import React from "react";
import Skeleton from "react-loading-skeleton"; // Import react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS file

function SkeletonLoading() {
  return (
    <>
      <div className="householdentrycontainer">
        <div className="titlebar">
          {/* Skeleton loading for title */}
          <Skeleton height={20} width={200} />
        </div>
        {/* Skeleton loading for SurveyDropdown */}
        <Skeleton height={30} width={200} />
        {/* Skeleton loading for Surveyques */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="skeletonQuestion">
            <Skeleton height={20} width={300} />
          </div>
        ))}
        {/* Skeleton loading for another SurveyDropdown */}
        <Skeleton height={30} width={200} />
        {/* Skeleton loading for another Surveyques */}
        <div className="skeletonQuestion">
          <Skeleton height={20} width={300} />
        </div>
        {/* Skeleton loading for submit button */}
        <div className="skeletonButton">
          <Skeleton height={40} width={100} />
        </div>
      </div>
    </>
  );
}

export default SkeletonLoading;
