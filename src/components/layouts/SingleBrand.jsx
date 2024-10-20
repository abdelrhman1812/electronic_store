import { Link } from "react-router-dom";

const SingleBrand = ({ brand }) => {
  console.log(brand);
  return (
    <div className="brand">
      <figure>
        <img src={brand.image.secure_url} className="" alt={brand.name} />
      </figure>
      <Link to={"/"} className="mx-auto d-block text-center position-relative">
        {brand.name}
      </Link>
    </div>
  );
};

export default SingleBrand;
