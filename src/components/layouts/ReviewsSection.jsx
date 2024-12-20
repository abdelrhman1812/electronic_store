import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../assets/style/reviews.css";
import { getReviews } from "../../services/Apis/reviewsApi/reviewsApi";
import StarRating from "./Products/StarRating";

const ReviewsSection = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [reviews, setReviews] = useState([]);

  const handleReview = async () => {
    try {
      const { data } = await getReviews();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    handleReview();
  }, []);

  return (
    <section className="container-xl my-5">
      <section className="section-title overflow-hidden mb-4 d-flex justify-content-between align-items-center py-2 p-1 position-relative">
        <h2>What Our Customers Say</h2>
      </section>

      <div className="row">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="p-2">
              <div className="review-card text-center p-4 shadow-sm">
                <img
                  src={
                    review?.createdBy?.profile?.secure_url ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  }
                  alt="User avatar"
                  className="review-avatar rounded-circle mb-3 w-100"
                />
                <div className="review-info">
                  <h6 className="review-name fw-bold mb-1">
                    {review?.createdBy?.name || "Anonymous"}
                  </h6>
                  <p className="review-comment text-muted mb-3">
                    {review?.comment || "No comment provided."}
                  </p>
                </div>
                <div className="review-rating">
                  <StarRating rate={review?.rate || 0} maxStars={5} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewsSection;
