import { BiBell, BiMenu, BiSearch, BiUser } from "react-icons/bi";
import { useTheme } from "../../../context/ThemeProvider";
import { useUserContext } from "../../../context/UserContext";

const AdminTopNav = ({ toggleMenu }) => {
  const { userProfile } = useUserContext();
  const { isDark, setIsDark } = useTheme();

  return (
    <nav className="admin-top-nav">
      <div className="d-flex align-items-center gap-3">
        <BiMenu
          className="d-block d-md-none nav-icon"
          size={24}
          onClick={toggleMenu}
        />
        <div className="search-wrapper d-none d-md-flex align-items-center gap-2 px-3 py-1 bg-light rounded-pill">
          <BiSearch className="text-muted" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-0 outline-none shadow-none p-1"
            style={{ fontSize: "0.85rem", width: "200px" }}
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 gap-md-4">
        <div className="d-flex align-items-center gap-2">
          {/* <div
            className="nav-icon"
            title="Toggle Theme"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <BiMoon size={20} /> : <BiSun size={20} />}
          </div> */}
          <div className="nav-icon d-none d-sm-flex" title="Notifications">
            <BiBell size={20} />
          </div>
        </div>

        <div className="user-profile-section d-flex align-items-center gap-3 ps-3 border-start border-light-subtle">
          <div className="text-end d-none d-md-block">
            <h6 className="m-0 fw-bold" style={{ fontSize: "0.9rem" }}>
              {userProfile?.user?.name || "Admin"}
            </h6>
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>
              Administrator
            </span>
          </div>
          <div className="profile-image-wrapper">
            {userProfile?.user?.profile?.secure_url ? (
              <img
                src={userProfile.user.profile.secure_url}
                alt={userProfile.user.name}
                className="rounded-3 shadow-sm"
              />
            ) : (
              <div
                className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: 34, height: 34 }}
              >
                <BiUser size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopNav;
