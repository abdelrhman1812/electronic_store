import {
  BiBookmark,
  BiCart,
  BiHomeAlt,
  BiMessageSquareX,
  BiPhone,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";

const NavBar = ({ showNav, toggle }) => {
  return (
    <>
      <nav
        className={`main-nav d-flex justify-content-md-center py-4 ${
          showNav ? "show-nav" : ""
        } `}
      >
        <BiMessageSquareX
          className="close top-0 end-0 m-3 position-absolute"
          size={30}
          onClick={() => {
            toggle();
          }}
        />

        <ul className="ul-main-nav d-flex">
          <li className="me-4 fw-medium">
            <NavLink to="/" className="active">
              <BiHomeAlt size={23} /> Home
            </NavLink>
          </li>

          <li className="me-4 fw-medium">
            <NavLink to="/shop" className="active">
              <BiCart size={23} /> Shop
            </NavLink>
          </li>
          <li className="me-4 fw-medium">
            <NavLink to="/brands" className="active">
              <BiBookmark size={23} />
              Brands
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="active">
              <BiPhone size={23} />
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
