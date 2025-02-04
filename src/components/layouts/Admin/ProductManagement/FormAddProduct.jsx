import { useState, useRef } from "react";
import useData from "../../../../services/Hooks/useData";
import useAddProduct from "./useAddProduct";
import { FaTrash } from "react-icons/fa";
const FormAddProduct = () => {
  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { categories, brands } = useData();
  const { loading, formik } = useAddProduct();
  const fileInput = useRef(null);

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

  const handleRemoveImage = (i) => {
    if (!fileInput.current || !fileInput.current.files) return;

    /* Convert to DataTransfer object to remove file */
    const dataTransfer = new DataTransfer();
    Array.from(fileInput.current.files)
      .filter((_, index) => index !== i)
      .forEach((file) => dataTransfer.items.add(file));

    /* Remove image preview */
    setImagesPreview((prev) => prev.filter((_, index) => index !== i));

    /* Replace files */
    fileInput.current.files = dataTransfer.files;
    console.log(fileInput.current.files);
  };

  return (
    <form className="position-relative" onSubmit={formik.handleSubmit}>
      <h3 className="text-center my-3">Add Product</h3>

      {/* Title and Description */}
      <div className="d-flex flex-column flex-md-row gap-3 my-3">
        <div className="form-group flex-grow-1">
          <label className="my-3" htmlFor="title">
            Product Title
          </label>
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
          <label className="my-3" htmlFor="description">
            Product Description
          </label>
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
          <label className="my-3" htmlFor="price">
            Product Price
          </label>
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
          <label className="my-3" htmlFor="stock">
            Product Stock
          </label>
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
          <label className="my-3" htmlFor="category">
            Category
          </label>
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
          <label className="my-3" htmlFor="brand">
            Brand
          </label>
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
        <label className="my-3" htmlFor="imageCover">
          Image Cover
        </label>
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
        <label className="my-3" htmlFor="images">
          Additional Images
        </label>
        <input
          id="images"
          ref={fileInput}
          name="images"
          type="file"
          className="form-control"
          multiple
          onChange={handleImagesPreview}
        />
        <div className="d-flex gap-2 mt-2">
          {imagesPreview.map((src, index) => (
            <>
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="img-preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />

              <FaTrash
                onClick={() => handleRemoveImage(index)}
                className="text-danger"
              />
            </>
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
  );
};

export default FormAddProduct;
