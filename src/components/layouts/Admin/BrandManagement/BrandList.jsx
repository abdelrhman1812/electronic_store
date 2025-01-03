import IsLoading from "../../../shared/IsLoading/IsLoading";
import PageHeader from "../../../shared/PageHeader/PageHeader";
import SingleBrand from "../../BrandPage/SingleBrand";

const BrandList = ({ entities, isLoading, handleDelete, handleUpdate }) => {
  return (
    <>
      <PageHeader title="Brands" />

      <div className="container-xl py-5">
        <div className="row g-3">
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              {entities?.map((brand) => (
                <div key={brand._id} className="col-sm-6 col-md-4 col-lg-3">
                  <SingleBrand
                    handleUpdateBrand={handleUpdate}
                    handleDelete={handleDelete}
                    brand={brand}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandList;
