import StarRating from "../../../../../common/StarRating";

const SingleReview = ({ review, rate }) => {
  return (
    <>
      <article className="content  d-flex  align-items-center">
        <figure className="  overflow-hidden text-center">
          <img
            className="img-fluid rounded  object-fit-cover"
            src={
              review?.createdBy?.profile?.secure_url ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            alt="User avatar"
          />
        </figure>

        <div className="user-information position-relative d-flex flex-column ">
          <h6 className="m-0">{review?.createdBy?.name}</h6>
          <p className="m-0">{review?.comment}</p>
          <div className="rating ">
            <StarRating rate={rate} maxStars={5} />
          </div>
        </div>
      </article>
    </>
  );
};

export default SingleReview;
