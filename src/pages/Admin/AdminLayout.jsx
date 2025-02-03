import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../../assets/style/admin.css";
import AdminSidBar from "../../components/layouts/Admin/AdminSidBar";
import AdminTopNav from "../../components/layouts/Admin/AdminTopNav";

const AdminLayout = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <AdminTopNav toggleMenu={toggleMenu} />
      <div className=" admin d-flex">
        <AdminSidBar menuActive={menuActive} toggleMenu={toggleMenu} />
        <section className="content">
          <main>
            <Outlet />
          </main>
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
