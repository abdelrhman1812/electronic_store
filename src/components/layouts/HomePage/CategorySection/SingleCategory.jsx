import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SingleCategory = ({ category }) => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="category" data-aos="fade-up">
      <figure>
        <img
          src={category?.image.secure_url}
          className="w-100"
          alt={category.name}
        />
        <Link
          to={`/category/${category.slug}`}
          className="mx-auto mt-2 d-block text-center position-relative"
        >
          {category.name}
        </Link>
      </figure>
    </div>
  );
};

export default SingleCategory;
