import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useData from "../../../../services/Hooks/useData";
const FormAddProduct = ({ formik, toggleModal, loading }) => {
  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories, brands } = useData();

  // Handlers for image previews
  const handleImageCoverPreview = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setImageCoverPreview(URL.createObjectURL(file));
      formik.setFieldValue("imageCover", file);
    }
  };

  const handleImagesPreview = (event) => {
    const files = Array.from(event.currentTarget.files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));
    formik.setFieldValue("images", files);
  };

  const isHexadecimal = (str) => /^[0-9a-fA-F]{24}$/.test(str);

  return (
    <div className="overlay-form-product position-fixed top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center overflow-auto ">
      <form className="position-relative" onSubmit={formik.handleSubmit}>
        <h3 className="text-center">Add Product</h3>
        <AiOutlineClose
          className="close-icon position-absolute  "
          onClick={toggleModal}
          size={30}
        />
        {/* Title and Description */}
        <div className="d-flex flex-column flex-md-row gap-3">
          <div className="form-group flex-grow-1">
            <label htmlFor="title">Product Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.title}
              </span>
            )}
          </div>

          <div className="form-group flex-grow-1">
            <label htmlFor="description">Product Description</label>
            <input
              id="description"
              name="description"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description && formik.touched.description && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.description}
              </span>
            )}
          </div>
        </div>

        {/* Price and Stock */}
        <div className="d-flex d-flex flex-column flex-md-row gap-3">
          <div className="form-group flex-grow-1">
            <label htmlFor="price">Product Price</label>
            <input
              id="price"
              name="price"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="form-group flex-grow-1">
            <label htmlFor="stock">Product Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.stock}
            />
            {formik.errors.stock && formik.touched.stock && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.stock}
              </span>
            )}
          </div>
        </div>

        {/* Category and Brand */}
        <div className="d-flex d-flex flex-column flex-md-row gap-3">
          <div className="form-group flex-grow-1">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-select"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={isHexadecimal(category._id) ? category._id : ""}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {formik.errors.category && formik.touched.category && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.category}
              </span>
            )}
          </div>
          {/* Brands */}
          <div className="form-group flex-grow-1">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              className="form-select"
              onChange={formik.handleChange}
              value={formik.values.brand}
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option
                  key={brand._id}
                  value={isHexadecimal(brand._id) ? brand._id : ""}
                >
                  {brand.name}
                </option>
              ))}
            </select>
            {formik.errors.brand && formik.touched.brand && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors.brand}
              </span>
            )}
          </div>
        </div>

        {/* Image Cover */}
        <div className="form-group">
          <label htmlFor="imageCover">Image Cover</label>
          <input
            id="imageCover"
            name="imageCover"
            type="file"
            className="form-control mb-2"
            onChange={handleImageCoverPreview}
          />
          {imageCoverPreview && (
            <img
              src={imageCoverPreview}
              alt="Cover Preview"
              className="img-preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Additional Images */}
        <div className="form-group">
          <label htmlFor="images">Additional Images</label>
          <input
            id="images"
            name="images"
            type="file"
            className="form-control"
            multiple
            onChange={handleImagesPreview}
          />
          <div className="d-flex gap-2 mt-2">
            {imagesPreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="img-preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </div>

        <button
          disabled={!(formik.isValid && formik.dirty) || loading.fetch}
          type="submit"
          className="btn btn-primary mt-3 text-center"
        >
          {loading.fetch ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormAddProduct;
