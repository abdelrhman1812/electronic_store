import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangePasswordForm } from "../../../services/Hooks/useChangePasswordForm";
import InputMessageError from "../../shared/InputMessageError/InputMessageError";

const ChangePassword = () => {
  const { formik, loading, error } = useChangePasswordForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else {
      setShowNewPassword(!showNewPassword);
    }
  };

  return (
    <section className="change-password  mt-5">
      <h2 className="mb-4">Change Password</h2>

      {error && <InputMessageError message={error} />}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="form-label">
            Current Password
          </label>
          <div className="input-group mb-3">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className={`form-control ${
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? "is-invalid"
                  : ""
              }`}
              id="currentPassword"
              placeholder="Enter current password"
              {...formik.getFieldProps("currentPassword")}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("current")}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <InputMessageError message={formik.errors.currentPassword} />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <div className="input-group mb-3">
            <input
              type={showNewPassword ? "text" : "password"}
              className={`form-control ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "is-invalid"
                  : ""
              }`}
              id="newPassword"
              placeholder="Enter new password"
              {...formik.getFieldProps("newPassword")}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <InputMessageError message={formik.errors.newPassword} />
          )}
        </div>

        <button
          type="submit"
          className="btn"
          disabled={!(formik.isValid && formik.dirty) || loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
