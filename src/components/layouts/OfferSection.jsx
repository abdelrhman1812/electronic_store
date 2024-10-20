import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OfferSection = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const countDown = () => {
    const selectedTime = new Date("OCT 30, 2024");

    const updateCountdown = () => {
      const now = new Date().getTime();
      let difference = selectedTime - now;

      // If difference is negative, add 15 days
      if (difference < 0) {
        const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
        selectedTime.setTime(
          selectedTime.getTime() + fifteenDaysInMilliseconds
        );
        difference = selectedTime - now;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    countDown();
  }, []);

  return (
    <>
      <section id="hot-deal" className="position-relative">
        <div className="container-xl">
          <div className="row m-0">
            <div className="col-md-12">
              <div className="hot-deal">
                <p>DEAL OF THE DAY</p>
                <ul className="hot-deal-countdown">
                  <li>
                    <div>
                      <h3>{days}</h3>
                      <span>Days</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{hours}</h3>
                      <span>Hours</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{minutes}</h3>
                      <span>Mins</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{seconds}</h3>
                      <span>Secs</span>
                    </div>
                  </li>
                </ul>
                <h2 className="text-uppercase">hot deal this week</h2>
                <p>New Collection Up to 50% OFF</p>
                <Link to={"/"}>Shop now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferSection;
