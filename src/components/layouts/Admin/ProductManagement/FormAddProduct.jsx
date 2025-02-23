import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom"; 
import { getProductSpecific } from "../../../../pages/ProductDetails";
import useData from "../../../../services/Hooks/useData";
import useAddProduct from "./useAddProduct";

const FormAddProduct = () => {
  const { formik, loading, setCurrentProductId } = useAddProduct();
  const { categories, brands } = useData();
  const fileInput = useRef(null);
  const { id } = useParams();

  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { product } = await getProductSpecific(id);
          if (product) {
            setCurrentProductId(product._id);
            formik.setValues({
              title: product.title || "",
              description: product.description || "",
              price: product.price || "",
              stock: product.stock || "",
              category: product.category?._id || "",
              brand: product.brand?._id || "",
              images: product.images || [],
            });

            if (Array.isArray(product.images) && product.images.length > 0) {
              Promise.all(
                product.images.map(async (img) => {
                  const imgUrl =
                    typeof img === "string" ? img : img?.secure_url;
                  if (!imgUrl) return null;

                  const response = await fetch(imgUrl);
                  const blob = await response.blob();
                  return new File([blob], imgUrl.split("/").pop(), {
                    type: blob.type,
                  });
                })
              )
                .then((files) => {
                  const validFiles = files.filter((file) => file !== null);
                  setImagesPreview(
                    validFiles.map((file) => URL.createObjectURL(file))
                  ); 
                  formik.setFieldValue("images", validFiles); 
                })
                .catch((err) => console.error("Error loading images:", err));
            }

            if (product.imageCover?.secure_url) {
              fetch(product.imageCover.secure_url)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File(
                    [blob],
                    product.imageCover.secure_url.split("/").pop(),
                    { type: blob.type }
                  );
                  setImageCoverPreview(URL.createObjectURL(file));
                })
                .catch((err) =>
                  console.error("Error loading imageCover:", err)
                );
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleFilePreview = (event, setPreview, fieldName) => {
    const files = Array.from(event.currentTarget.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews.length > 1 ? previews : previews[0]);
    formik.setFieldValue(fieldName, files.length > 1 ? files : files[0]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    setImagesPreview(updatedImages);
    formik.setFieldValue("images", updatedImages);
  };

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
        value={formik.values[id] || ""}
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
              value={formik.values[id] || ""}
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
        {loading.submit ? "Loading..." : id ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default FormAddProduct;
