import { useState } from "react";
import { BiAlignRight } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import SideBarProfile from "../../../components/layouts/ProfileUser/SideBarProfile";

const LayoutProfile = () => {
  const [showSidBar, setShowSidBar] = useState(false);
  const toggleSidebar = () => {
    setShowSidBar(!showSidBar);
  };
  return (
    <section className="py-3 min-vh-100 position-relative overflow-hidden">
      <BiAlignRight
        size={30}
        className="d-block d-md-none ms-auto me-3 text-primary"
        onClick={toggleSidebar}
      />

      <div className="container-xl">
        <div className="row g-3">
          {/* SideBer */}
          <div className="col-md-3">
            <SideBarProfile
              showSidBar={showSidBar}
              toggleSidebar={toggleSidebar}
            />
          </div>
          {/* Main content */}
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutProfile;
