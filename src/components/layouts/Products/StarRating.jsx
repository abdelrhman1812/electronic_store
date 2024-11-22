import { BiSolidStar } from "react-icons/bi";

const StarRating = ({ maxStars = 5, rate, onRatingChange }) => {
  const handleRating = (index) => {
    if (onRatingChange) {
      // Only allow click if `onRatingChange` is passed
      onRatingChange(index + 1);
    }
  };

  return (
    <div>
      {Array.from({ length: maxStars }, (_, index) => (
        <BiSolidStar
          key={index}
          className={`star ${index < rate ? "text-warning" : "star-reviews"}`}
          onClick={() => handleRating(index)}
          style={{ cursor: onRatingChange ? "pointer" : "default" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
