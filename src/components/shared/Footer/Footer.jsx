import { BiLogoMastercard } from "react-icons/bi";
import {
  FaApplePay,
  FaCcPaypal,
  FaFacebook,
  FaGooglePay,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import bgImageLight from "../../../assets/Images/bg4-light.jpg";
import bgImageDark from "../../../assets/Images/Hero/bg-1.jpg";
import "../../../assets/style/footer.css";
import { useTheme } from "../../../context/ThemeProvider";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className="my-0 mx-auto"
      style={{
        backgroundImage: `url(${isDark ? bgImageDark : bgImageLight})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container-xl">
        <div className="row m-0">
          <div className="col-md-3">
            <h2 className="brand-title">Electro</h2>
            {/* <img src={logo} alt="electro" className="" /> */}

            <p>
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>

            <div className="d-flex gap-4 mb-sm-4">
              <Link to={"/"}>
                <FaTwitter />
              </Link>
              <Link to={"/"}>
                <FaFacebook />
              </Link>

              <Link to={"/"}>
                <FaInstagram />
              </Link>
            </div>
          </div>

          <div className=" col-md-9 ">
            <div className="row g-3 m-0">
              <div className="col-6  col-md-3">
                <ul>
                  <li>
                    <h5>COMPANY</h5>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/">Features</Link>
                  </li>
                  <li>
                    <Link to="/">Works</Link>
                  </li>
                  <li>
                    <Link to="/">Career</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul>
                  <li>
                    <h5>HELP</h5>
                  </li>
                  <li>
                    <Link to="/">Customer Support</Link>
                  </li>
                  <li>
                    <Link to="/">Delivery Details</Link>
                  </li>
                  <li>
                    <Link to="/">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul>
                  <li>
                    <h5>FAQ</h5>
                  </li>
                  <li>
                    <Link to="/">Account</Link>
                  </li>
                  <li>
                    <Link to="/">Manage Deliveries</Link>
                  </li>
                  <li>
                    <Link to="/">Orders</Link>
                  </li>
                  <li>
                    <Link to="/">Payments</Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul>
                  <li>
                    <h5>RESOURCES</h5>
                  </li>
                  <li>
                    <Link to="/">Free eBooks</Link>
                  </li>
                  <li>
                    <Link to="/">Development Tutorials</Link>
                  </li>
                  <li>
                    <Link to="/">How to - Blog</Link>
                  </li>
                  <li>
                    <Link to="/">Youtube Playlist</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="copyRight row m-0 d-md-flex justify-content-between align-items-center">
          <div className="copyRight-desc col-12 col-md-6 ">
            <p className="mb-0">
              Electro &copy; 2000-2021, All rights reserved
            </p>
          </div>
          <div className="paymentMethod  col-12 col-md-6 d-flex gap-3  justify-content-center align-items-center">
            <RiVisaLine className="text-info" />

            <BiLogoMastercard className="text-warning" />

            <FaCcPaypal className="text-info " />

            <FaApplePay />

            <FaGooglePay />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
