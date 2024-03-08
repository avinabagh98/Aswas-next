import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ count }) => {
  return (
    <div>
      {/* Your skeleton loading effect */}
      <Skeleton height={20} width={"100%"} count={count} />
    </div>
  );
};

export default SkeletonLoader;
