import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const SharedForm = ({ error, formik, loading, type, currentEntityId }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentEntityId?.image?.secure_url) {
      setImagePreview(currentEntityId.image.secure_url);
      fetch(currentEntityId.image.secure_url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            currentEntityId.image.secure_url.split("/").pop(),
            { type: blob.type }
          );
          formik.setFieldValue("name", currentEntityId.name);
          formik.setFieldValue("image", file);
        })
        .catch((err) => console.error("Error loading image:", err));
    }
  }, [currentEntityId]);

  /* Handle image selection */
  const handleImageChange = (file) => {
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* Handle drag & drop */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  /* Handle click to open file input */
  const handleClick = () => {
    fileInputRef.current.click();
  };

  /* Handle image removal */
  const removeImage = () => {
    setImagePreview(null);
    formik.setFieldValue("image", null);
    fileInputRef.current.value = null;
  };

  return (
    <section className="shared_form dashboard_form  my-5">
      <div className="form-container position-relative">
        {/* <h3>{currentEntityId ? `Update ${type}` : `Add New ${type}`}</h3> */}
        {error && <span className="text-danger">{error}</span>}

        <form onSubmit={formik.handleSubmit} className="form container-xxl">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">{`${type} Name`}</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter category name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className={
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }
            />
            {formik.touched.name && formik.errors.name && (
              <span className="invalid-feedback">{formik.errors.name}</span>
            )}
          </div>

          {/* Image Upload with Drag & Drop */}
          <div className="form-group">
            <label>Image</label>
            {formik.values.image && (
              <AiOutlineClose
                className="remove_img_icon text-danger border mx-3"
                onClick={removeImage}
              />
            )}
            <div
              className={`drop-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              {imagePreview ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="preview-img"
                  />
                </div>
              ) : (
                <p>
                  Drag & drop an image or click to select <AiOutlineClose />
                </p>
              )}
              <input
                id="image"
                name="image"
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e.target.files[0])}
                className="file-input"
                hidden
              />
            </div>
            {formik.touched.image && formik.errors.image && (
              <span className="invalid-feedback">{formik.errors.image}</span>
            )}
          </div>

          <button
            disabled={loading || !(formik.isValid && formik.dirty)}
            type="submit"
            className=" mt-3"
          >
            {loading ? (
              <BiLoaderCircle className="animate-spin" />
            ) : (
              `${currentEntityId ? "Update" : "Add"} `
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SharedForm;
