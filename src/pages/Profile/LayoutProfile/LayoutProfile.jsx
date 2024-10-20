import { Outlet } from "react-router-dom";
import Sidebar from "../OrderPage/Sidebar";

const LayoutProfile = () => {
  return (
    <div className=" py-3 min-vh-100">
      <div className="container-xl">
        <div className="row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;
