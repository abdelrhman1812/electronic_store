// import { useState } from "react";
import "../../../assets/style/admin.css";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidBar from "../../../components/layouts/Admin/AdminSidBar";
import AdminTopNav from "../../../components/layouts/Admin/AdminTopNav";

const AdminLayout = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    console.log(menuActive);
  };

  return (
    <>
      <div className=" admin">
        <AdminSidBar menuActive={menuActive} toggleMenu={toggleMenu} />
        <section className="content">
          <AdminTopNav toggleMenu={toggleMenu} />
          <main>
            <Outlet />
          </main>
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
