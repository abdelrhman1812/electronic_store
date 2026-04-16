import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
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
            { type: blob.type },
          );
          formik.setFieldValue("name", currentEntityId.name);
          formik.setFieldValue("image", file);
        })
        .catch((err) => console.error("Error loading image:", err));
    }
  }, [currentEntityId]);

  const handleImageChange = (file) => {
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    formik.setFieldValue("image", null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="shared_form dashboard_form">
      <div className="text-center mb-4">
        <h3 className="m-0">
          {currentEntityId ? `Edit ${type}` : `Create New ${type}`}
        </h3>
        <p className="text-muted small">Fill in the information below</p>
      </div>

      {error && (
        <div className="alert alert-danger border-0 rounded-3 small py-2 d-flex align-items-center gap-2 mb-3">
          <AiOutlineClose size={14} /> {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="name" className="form-label">
            {type} Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={`Enter ${type.toLowerCase()} name`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className={`form-control shadow-none ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Upload Cover Image</label>
          <div
            className={`drop-zone position-relative overflow-hidden ${dragOver ? "border-primary bg-primary-subtle" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {imagePreview ? (
              <div className="image-preview-wrapper position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-img"
                  style={{ maxHeight: "90px", objectFit: "contain" }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1 shadow"
                  onClick={removeImage}
                  style={{ width: "24px", height: "24px", padding: 0 }}
                >
                  <AiOutlineClose size={12} />
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center gap-1 py-3">
                <div className="upload-icon-wrapper rounded-circle bg-white shadow-sm p-2 mb-1">
                  <AiOutlineCloudUpload size={32} className="text-primary" />
                </div>
                <p className="fw-bold m-0 text-dark small">
                  Click to upload or drag & drop
                </p>
                <p className="text-muted extra-small m-0">
                  SVG, PNG, JPG (max. 800x400px)
                </p>
              </div>
            )}
            <input
              id="image"
              name="image"
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="d-none"
              accept="image/*"
            />
          </div>
          {formik.touched.image && formik.errors.image && (
            <div className="invalid-feedback d-block">
              {formik.errors.image}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end gap-3 pt-4 mt-4 border-top">
          <button
            type="button"
            className="btn btn-light rounded-pill px-4"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            disabled={loading || !(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-primary rounded-pill px-5 d-flex align-items-center gap-2"
          >
            {loading ? (
              <>
                <BiLoaderCircle className="animate-spin" /> Processing...
              </>
            ) : (
              <>{currentEntityId ? "Update Record" : `Add ${type}`} </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SharedForm;
