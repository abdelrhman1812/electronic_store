import { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "../../../context/ThemeProvider";
import Skeleton from "../Skeleton/Skeleton";

const IsLoading = ({ count = 8, columns = 4, height = 200, width = 0 }) => {
  const { isDark } = useTheme();

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`col-sm-6  my-1 col-md-${12 / columns} w-${width} `}
          >
            <SkeletonTheme baseColor={isDark ? "#022554" : "#ffff"}>
              <Skeleton height={height} duration={2} />
            </SkeletonTheme>
          </div>
        ))}
    </>
  );
};

export default IsLoading;
