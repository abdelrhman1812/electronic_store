import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header/Header";
import NewsLetter from "../../components/shared/NewsLetter/NewsLetter";
const Layout = () => {
  return (
    <>
      <main>
        <Header />
        <Outlet />
        <NewsLetter />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
