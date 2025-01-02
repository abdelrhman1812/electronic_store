import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/style/reviews.css";
import { getReviews } from "../../services/Apis/reviewsApi/reviewsApi";
import StarRating from "./Products/StarRating";

const ReviewsSection = () => {
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
      {reviews.length > 0 && (
        <>
          <section className="section-title overflow-hidden mb-4 d-flex justify-content-between align-items-center py-2 p-1 position-relative">
            <h2>What Our Customers Say</h2>
          </section>

          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

export default ReviewsSection;
