import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Skeleton = ({ ...props }) => {
  return <ReactSkeleton {...props} />;
};

export default Skeleton;
