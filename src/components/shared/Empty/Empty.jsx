import { Link } from "react-router-dom";

const Empty = ({ title, description }) => {
  return (
    <section className="empty d-flex flex-column justify-content-center align-items-center py-5">
      <h2>{title}</h2>
      <Link to={"/"}>{description}</Link>
    </section>
  );
};

export default Empty;
