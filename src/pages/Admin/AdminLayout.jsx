import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../../assets/style/admin.css";
import AdminSidBar from "../../components/layouts/Admin/AdminSidBar";
import AdminTopNav from "../../components/layouts/Admin/AdminTopNav";

const AdminLayout = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    console.log("toggleMenu", menuActive);
  };

  return (
    <>
      <div className="admin d-flex px-3 py-3">
        <AdminSidBar
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          toggleMenu={toggleMenu}
        />
        <section className="content">
          <main className="p-3">
            <AdminTopNav toggleMenu={toggleMenu} />
            <Outlet />
          </main>
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
