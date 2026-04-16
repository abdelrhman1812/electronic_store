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
    <div className="admin-dashboard-wrapper">
      <div className="admin-layout d-flex min-vh-100" style={{ backgroundColor: 'var(--admin-bg-light)' }}>
        <AdminSidBar
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          toggleMenu={toggleMenu}
        />
        <div className="main-content-wrapper flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
          <header className="sticky-top py-2 px-3 px-md-4" style={{ zIndex: 90 }}>
            <AdminTopNav toggleMenu={toggleMenu} />
          </header>
          <main className="flex-grow-1 p-2 p-md-3">
            <div className="container-fluid p-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
