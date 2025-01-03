import Slider from "react-slick";
import IsLoading from "../../../shared/IsLoading/IsLoading";
import SingleCategory from "./SingleCategory";

const CategorySection = ({ categories, isLoading }) => {
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section p-section">
      <div className="container-xl">
        <div className="row category-section">
          {isLoading && <IsLoading columns={4} count={4} />}
          {!isLoading && (
            <Slider {...settings}>
              {categories?.map((category) => {
                return (
                  <SingleCategory key={category._id} category={category} />
                );
              })}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
