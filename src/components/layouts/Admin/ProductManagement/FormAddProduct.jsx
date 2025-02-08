import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useData from "../../../../services/Hooks/useData";
import useAddProduct from "./useAddProduct";

const FormAddProduct = () => {
  const { formik, loading } = useAddProduct();
  const { categories, brands } = useData();
  const fileInput = useRef(null);
  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  /* Handle image selection */
  const handleFilePreview = (event, setPreview, fieldName) => {
    const files = Array.from(event.currentTarget.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews.length > 1 ? previews : previews[0]);
    formik.setFieldValue(fieldName, files.length > 1 ? files : files[0]);
  };

  /* Handle image previews */
  const handleRemoveImage = (index) => {
    if (!fileInput.current?.files) return;

    const dataTransfer = new DataTransfer();
    Array.from(fileInput.current.files)
      .filter((_, i) => i !== index)
      .forEach((file) => dataTransfer.items.add(file));

    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    fileInput.current.files = dataTransfer.files;
  };

  /* Render input field */
  const renderInputField = (id, label, type = "text") => (
    <div className="form-group flex-grow-1">
      <label className="my-3" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={`Enter product ${label.toLowerCase()}`}
        onChange={formik.handleChange}
        value={formik.values[id]}
        onBlur={formik.handleBlur}
      />
      {formik.errors[id] && formik.touched[id] && (
        <span className="text-danger d-block mt-3 text-center">
          {formik.errors[id]}
        </span>
      )}
    </div>
  );

  return (
    <form
      className="position-relative dashboard_form my-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="d-flex flex-column flex-md-row gap-3 my-3">
        {renderInputField("title", "Product Title")}
        {renderInputField("description", "Product Description")}
      </div>

      <div className="d-flex flex-column flex-md-row gap-3">
        {renderInputField("price", "Product Price", "number")}
        {renderInputField("stock", "Product Stock", "number")}
      </div>

      <div className="d-flex flex-column flex-md-row gap-3">
        {[
          { id: "category", label: "Category", options: categories },
          { id: "brand", label: "Brand", options: brands },
        ].map(({ id, label, options }) => (
          <div key={id} className="form-group flex-grow-1">
            <label className="my-3" htmlFor={id}>
              {label}
            </label>
            <select
              id={id}
              name={id}
              onChange={formik.handleChange}
              value={formik.values[id]}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            {formik.errors[id] && formik.touched[id] && (
              <span className="text-danger d-block mt-3 text-center">
                {formik.errors[id]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="form-group">
        <label className="my-3" htmlFor="imageCover">
          Image Cover
        </label>
        <input
          id="imageCover"
          name="imageCover"
          type="file"
          onChange={(e) =>
            handleFilePreview(e, setImageCoverPreview, "imageCover")
          }
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

      <div className="form-group">
        <label className="my-3" htmlFor="images">
          Additional Images
        </label>
        <input
          id="images"
          ref={fileInput}
          name="images"
          type="file"
          multiple
          onChange={(e) => handleFilePreview(e, setImagesPreview, "images")}
        />
        <div className="d-flex gap-2 mt-2">
          {imagesPreview.map((src, index) => (
            <div key={index} className="position-relative">
              <img
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
                className="text-danger cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={!(formik.isValid && formik.dirty)}
        type="submit"
        className="btn_form_dashboard"
      >
        {loading.submit ? "Loading..." : "Add"}
      </button>
    </form>
  );
};

export default FormAddProduct;
