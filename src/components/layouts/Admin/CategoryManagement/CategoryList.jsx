import { BiEdit, BiTrash } from "react-icons/bi";
import IsLoading from "../../../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../../../components/shared/PageHeader/PageHeader";

const CategoryList = ({ entities, handleUpdate, handleDelete, isLoading }) => {
  return (
    <>
      <section className="category-list ">
        <PageHeader title="Categories" />
        <div className="container-xl py-5">
          <div className="row row-gap-4">
            {isLoading ? (
              <IsLoading />
            ) : (
              <>
                {entities?.map((category) => (
                  <div className="col-sm-6 col-lg-3" key={category._id}>
                    <div className="item pb-2">
                      <figure>
                        <img
                          className="w-100"
                          src={category.image.secure_url}
                          alt={category.name}
                        />
                        <figcaption className="pt-3 text-center">
                          <h6>{category.name}</h6>
                        </figcaption>
                      </figure>
                      <div className="d-flex justify-content-center gap-2 my-2">
                        <BiEdit
                          onClick={() => handleUpdate(category)}
                          size={20}
                          className="text-primary"
                        />
                        <BiTrash
                          onClick={() => handleDelete(category._id)}
                          size={20}
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;
