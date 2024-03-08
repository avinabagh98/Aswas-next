import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({ count }) => {
  return (
    <div>
      {/* Your skeleton loading effect */}
      <Skeleton height={100} width={"100%"} count={count} />
    </div>
  );
};

export default SkeletonLoading;
