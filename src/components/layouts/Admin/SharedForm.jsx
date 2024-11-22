import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const SharedForm = ({
  error,
  formik,
  loading,
  type,
  onClose,
  currentEntityId,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (currentEntityId?.image?.secure_url) {
      setImagePreview(currentEntityId.image.secure_url);
      // Create a new File object from the image URL
      fetch(currentEntityId.image.secure_url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            currentEntityId.image.secure_url.split("/").pop(),
            {
              type: blob.type,
            }
          );
          formik.setFieldValue("image", file);
        })
        .catch((err) => console.error("Error loading image:", err));
    }
  }, [currentEntityId]);

  /* Handle image change */
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="overlay-form position-fixed top-0 left-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center">
      <div className="form-container position-relative">
        <AiOutlineClose onClick={onClose} className="close-icon" />
        <h3>{currentEntityId ? `Update ${type}` : `Add New ${type}`}</h3>
        {error && <span className="text-danger">{error}</span>}
        {/* Form */}

        <form onSubmit={formik.handleSubmit} className="form">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">{`${type} Name`}</label>
            <input
              id="name"
              name="name"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className={` ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="invalid-feedback">{formik.errors.name}</span>
            )}
          </div>

          {/* Image */}
          <div className="form-group">
            <label htmlFor="image">Image</label>
            {imagePreview && (
              <div className="image-preview p-1 mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-img"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </div>
            )}
            <div className="input-group">
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                className={` ${
                  formik.touched.image && formik.errors.image
                    ? "is-invalid"
                    : ""
                }`}
              />
              {currentEntityId?.image?.secure_url && (
                <input
                  type="text"
                  readOnly
                  value={currentEntityId.image.secure_url}
                  className=" d-none"
                  style={{ flex: "1" }}
                />
              )}
            </div>
            {formik.touched.image && formik.errors.image && (
              <span className="invalid-feedback">{formik.errors.image}</span>
            )}
          </div>

          <button
            disabled={loading || !(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-primary mt-3"
          >
            {loading ? (
              <BiLoaderCircle className="animate-spin" />
            ) : (
              `${currentEntityId ? "Update" : "Add"} `
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharedForm;
