import { Link } from "react-router-dom";

const SectionTitle = ({ title }) => {
  return (
    <>
      <section className="section-title d-flex justify-content-between align-items-center py-2 p-1 position-relative">
        <h2>{title}</h2>
        <Link className="text-center p-2">Show More</Link>
      </section>
    </>
  );
};

export default SectionTitle;
