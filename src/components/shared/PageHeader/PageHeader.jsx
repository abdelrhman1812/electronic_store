import { BiChevronRight } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import "../../../assets/style/shared.css";

const PageHeader = ({ title }) => {
  return (
    <section className="page-header">
      <div className="container-xl">
        <div className="row">
          <span className="  position-relative z-1   d-flex justify-content-center gap-2 align-items-center">
            <GoHome size={23} />
            <BiChevronRight size={23} />
            {title}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
