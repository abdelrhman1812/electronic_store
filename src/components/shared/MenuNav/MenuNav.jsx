import { useEffect } from "react";
import { BiDownArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const MenuNav = ({ userProfile, handleLogout, setIsMenuVisible }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".close-menu") &&
        !event.target.closest(".menu")
      ) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuVisible]);
  return (
    <>
      <div className="menu p-3 position-absolute end-0">
        <BiDownArrowCircle className="arrow-menu position-absolute top-0 end-0 " />
        {userProfile?.user ? (
          <>
            <Link
              className=" my-2 d-block text-center text-white"
              to="/profile"
            >
              Profile
            </Link>
            <button
              className="my-2 text-white text-center  w-100 border-0 bg-transparent"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className=" my-2 d-block text-center text-white" to="/login">
              Login
            </Link>
            <Link
              className=" my-2 d-block text-center text-white"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default MenuNav;
