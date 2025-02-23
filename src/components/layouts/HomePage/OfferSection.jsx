import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImageLight from "../../../assets/Images/hotdeal.png";
import bgImageDark from "../../../assets/Images/hotdeal_dark.png";
import { useTheme } from "../../../context/ThemeProvider";

const OfferSection = () => {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = useCallback(() => {
    const targetDate = new Date("Apr 1, 2025").getTime();
    const now = new Date().getTime();
    let difference = targetDate - now;

    if (difference < 0) {
      const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
      difference += fifteenDaysInMilliseconds;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }, []);

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [calculateCountdown]);

  return (
    <section id="hot-deal" className="position-relative">
      <div
        className="container-xl"
        style={{
          backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row m-0">
          <div className="col-md-12">
            <div className="hot-deal text-center">
              <p className="text-white fs-5 fw-light px-4 py-2 rounded-top-pill position-absolute top-0">
                DEAL OF THE DAY
              </p>
              <ul className="hot-deal-countdown mb-5">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <li
                    key={unit}
                    className="position-relative text-center rounded-circle mx-1 d-inline-block"
                  >
                    <div className="position-absolute end-0 start-0">
                      <h3 className="text-white">{value}</h3>
                      <span className="d-block text-uppercase text-white">
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <h2 className="text-uppercase">hot deal this week</h2>
              <p className="text-uppercase fs-2">
                New Collection Up to 50% OFF
              </p>
              <Link className="text-white px-4 py-2 rounded-pill" to="/shop">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
