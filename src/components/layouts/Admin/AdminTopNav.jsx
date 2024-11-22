import { BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { useTheme } from "../../../context/ThemeProvider";
import { useUserContext } from "../../../context/UserContext";

const AdminTopNav = ({ toggleMenu }) => {
  const { userProfile } = useUserContext();
  const { isDark, setIsDark } = useTheme();

  return (
    <section className="admin-top-nav d-flex justify-content-between align-items-center">
      <div className="icons d-flex align-items-center gap-3">
        <BiMenu size={22} onClick={toggleMenu} />

        {isDark ? (
          <BiMoon size={22} onClick={() => setIsDark(!isDark)} />
        ) : (
          <BiSun size={22} onClick={() => setIsDark(!isDark)} />
        )}
      </div>

      <div className="d-flex align-items-center gap-3">
        <h5 className="m-0 text-white">{userProfile?.user?.name}</h5>
        <img
          src={userProfile?.user?.profile?.secure_url}
          alt={userProfile?.user?.name}
        />
      </div>
    </section>
  );
};

export default AdminTopNav;
