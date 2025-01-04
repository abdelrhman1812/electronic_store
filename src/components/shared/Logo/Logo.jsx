import { Link } from "react-router-dom";

import logo from "../../../assets/Images/logo.png";
const Logo = () => {
  return (
    <>
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <div className="header-logo">
          <Link to={"/"} className="logo">
            <img src={logo} alt="Electro" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Logo;
