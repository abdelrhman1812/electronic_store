import { useEffect, useState } from "react";
import { BiMessageSquareX } from "react-icons/bi";
import ImageUploader from "../../../components/layouts/ProfileUser/ImageUploader";
import { useUserContext } from "../../../context/UserContext";
import "./../../../assets/style/profile.css";
import SideBarLinks from "./sideBarLinks";

const SideBarProfile = ({ showSidBar, toggleSidebar }) => {
  const { userProfile } = useUserContext();
  const [newImage, setNewImage] = useState(null);

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
        showSidBar ? "visible-sidebar-profile" : "not-visible-sidebar-profile "
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
        <h4 className="text-center"> {userProfile?.user?.name || "Guest"}</h4>
        <SideBarLinks />
      </ul>
    </aside>
  );
};

export default SideBarProfile;
