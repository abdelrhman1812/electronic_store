import StarRating from "../../../../../common/StarRating";

const SingleReview = ({ review, rate }) => {
  console.log(review);
  return (
    <>
      <div className="content p-2 d-flex justify-content-between align-items-center">
        <img
          src={
            review?.createdBy?.profile?.secure_url ||
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
          }
          alt="User avatar"
        />
        <div className="user-information position-relative">
          <h6>{review?.createdBy?.name}</h6>
          <p>{review?.comment}</p>
        </div>
        <div className="rating">
          <StarRating rate={rate} maxStars={5} />
        </div>
      </div>
    </>
  );
};

export default SingleReview;
