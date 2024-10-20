import Aos from "aos";
import { useEffect } from "react";
import banner1 from "../../assets/Images/Banner/h2_b4.jpg";
import banner2 from "../../assets/Images/Banner/h2_b5.jpg";
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
              {/* <div className="banner-date">
                <h4>Make the noise music in pro</h4>
                <span>
                  {" "}
                  <small>From</small>69.99$
                </span>
                <Link>Shop Now</Link>
              </div> */}
              <img src={banner1} className="w-100" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="banner-item position-relative"
              data-aos="flip-right"
            >
              <img src={banner2} className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
