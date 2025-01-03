import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

const SingleBrand = ({ brand, handleDelete, handleUpdateBrand }) => {
  const { userProfile } = useUserContext();

  return (
    <div className="brand w-100 h-100 d-flex flex-column justify-content-center align-items-center pb-2">
      <figure className="w-100 h-100 d-flex align-items-center overflow-hidden">
        <img src={brand.image.secure_url} className="w-100" alt={brand.name} />
      </figure>
      <Link to={"/"} className="mx-auto d-block text-center position-relative">
        {brand.name}
      </Link>

      {userProfile?.user?.role === "admin" && (
        <div className="d-flex gap-2 my-2">
          <BiEdit
            onClick={() => handleUpdateBrand(brand)}
            size={20}
            className="text-primary"
          />
          <BiTrash
            size={20}
            className="text-danger"
            onClick={() => handleDelete(brand._id)}
          />
        </div>
      )}
    </div>
  );
};

export default SingleBrand;
