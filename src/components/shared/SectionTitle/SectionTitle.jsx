import { Link } from "react-router-dom";

const SectionTitle = ({ title, path }) => {
  return (
    <>
      <section className="section-title overflow-hidden mb-4 d-flex justify-content-between align-items-center py-2 p-1 position-relative">
        <h2>{title}</h2>
        <Link to={path} className="text-center p-2">
          Show More
        </Link>
      </section>
    </>
  );
};

export default SectionTitle;
