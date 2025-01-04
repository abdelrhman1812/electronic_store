import IsLoading from "../../../../shared/IsLoading/IsLoading";

const ImagesSpecificProduct = ({ product, loading }) => {
  return (
    <>
      <div className="row g-3">
        {/* Cover Image */}
        <div className="col-12 d-flex justify-content-center align-items-center">
          {loading ? (
            <IsLoading count={1} columns={3} width={75} />
          ) : (
            <figure className="p-1">
              <img
                src={product?.imageCover?.secure_url}
                className="w-75 d-block mx-auto rounded-2 shadow-sm"
                alt={product?.title}
                loading="lazy"
              />
            </figure>
          )}
        </div>

        {/* Images */}
        <div className="col-12 images d-flex justify-content-center align-items-center gap-3">
          {loading ? (
            <IsLoading count={3} columns={3} width={25} height={100} />
          ) : (
            product?.images?.map((image, index) => (
              <img
                src={image.secure_url}
                alt={`product-image-${index}`}
                key={index}
                loading="lazy"
                className="img-thumbnail"
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ImagesSpecificProduct;
