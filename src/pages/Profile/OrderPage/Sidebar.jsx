/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  BiCart,
  BiLogOutCircle,
  BiMessageSquareX,
  BiSolidEditLocation,
  BiUser,
} from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import ImageUploader from "../../../components/layouts/ProfileUser/ImageUploader";
import { useUserContext } from "../../Login";
import "./../../../assets/style/profile.css";

const Sidebar = ({ showSidBar, toggleSidebar }) => {
  const { userProfile } = useUserContext();
  const [newImage, setNewImage] = useState(null);
  const location = useLocation();

  // Function to handle media query
  const handleResize = () => {
    if (window.innerWidth <= 767) {
      toggleSidebar(false);
    }
  };

  useEffect(() => {
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`sideBar-profile py-2 position-relative ${
        showSidBar ? "visible-sidebar-profile" : ""
      }`}
    >
      <BiMessageSquareX
        size={30}
        onClick={toggleSidebar}
        className="d-block d-md-none ms-auto text-primary "
      />
      <ul className="pt-5">
        <div className="img-user position-relative">
          <img
            src={
              newImage ||
              userProfile?.user?.profile?.secure_url ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            className="w-50 d-block mx-auto rounded-2 mb-3"
            alt={userProfile?.user?.name}
          />
          <ImageUploader setNewImage={setNewImage} />
        </div>
        <h4> {userProfile?.user?.name || "Guest"}</h4>
        <li className="mb-3 d-flex align-items-center">
          <NavLink
            to="/profile/order"
            className={({ isActive }) =>
              isActive || location.pathname === "/profile"
                ? "active-link-profile"
                : ""
            }
          >
            <BiCart size={20} className="me-2" />
            Orders
          </NavLink>
        </li>

        <li className="mb-3 d-flex align-items-center">
          <NavLink
            to="/profile/account"
            className={({ isActive }) =>
              isActive ? "active-link-profile" : ""
            }
          >
            <BiUser size={20} className="me-2" />
            Account
          </NavLink>
        </li>

        <li className="mb-3 d-flex align-items-center">
          <NavLink to="/profile/account" className="text-muted">
            <BiSolidEditLocation size={20} className="me-2" />
            Address
          </NavLink>
        </li>
        <li className="mb-3 d-flex align-items-center border-0">
          <NavLink to="/profile" className="border-0">
            <BiLogOutCircle size={20} className="me-2" />
            Logout
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
