import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";

import slide_1 from "../../../assets/Images/Hero/slide1-1.png";
import slide_2 from "../../../assets/Images/Hero/slide2-1.png";
import slide_3 from "../../../assets/Images/Hero/slide3-1.png";

const HeroSection = () => {
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="hero container-xl my-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="hero-data">
            <h2>
              Get <span>Best Device</span> With Lowest Price
            </h2>
            <p>
              iPad is a line of tablet computers designed, developed and
              marketed by Apple Inc., which run the iOS and iPad OS mobile
              operating systems.
            </p>
            <button className="explore-btn">
              Explore Now <FaArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="col-lg-6 ">
          <Slider {...settings} className="w-100 ">
            <div className="w-100 p-5 h-100   d-flex justify-content-center align-items-center">
              <img src={slide_1} className="  mx-auto d-block" alt="Slide 1" />
            </div>
            <div className="w-100  p-5 h-100  d-flex justify-content-center align-items-center">
              <img src={slide_2} className="  mx-auto d-block" alt="Slide 2" />
            </div>

            <div className="w-100  p-5 h-100  d-flex justify-content-center align-items-center">
              <img src={slide_3} className="  mx-auto d-block" alt="Slide 3" />
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
