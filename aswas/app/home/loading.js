import React from "react";
import SkeletonLoading from "@/components/SkeletonLoading/SkeletonLoading"; // Import your SkeletonLoading component

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <SkeletonLoading count={5} />;
}
