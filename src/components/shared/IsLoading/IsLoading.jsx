import Skeleton from "../Skeleton/Skeleton";

const IsLoading = ({ count = 8, columns = 4, height = 200 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={`col-sm-6 col-md-${12 / columns}`}>
            <Skeleton height={height} duration={2} />
          </div>
        ))}
    </>
  );
};

export default IsLoading;
