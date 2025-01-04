import Aos from "aos";
import { useEffect } from "react";
import banner1 from "../../../assets/Images/Banner/h2_b4.jpg";
import banner2 from "../../../assets/Images/Banner/h2_b5.jpg";
const Banner = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <section className="banner p-section overflow-hidden">
      <div className="container-xl">
        <div className="row g-3">
          <div className="col-md-6 ">
            <div className="banner-item position-relative" data-aos="flip-left">
              <img src={banner1} className="w-100 rounded-3" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="banner-item position-relative"
              data-aos="flip-right"
            >
              <img
                src={banner2}
                className="w-100 rounded-3"
                alt="electronics"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
