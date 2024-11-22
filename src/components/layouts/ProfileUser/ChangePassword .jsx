import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { MessageError, notify } from "../../../pages/Login";
import { changePassword } from "../../../services/Apis/userApi/userApi";
import InputMessageError from "../../shared/InputMessageError/InputMessageError";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      const data = await changePassword(values);
      if (data.success) {
        notify("success", "success changed password");
        setError(null);
        formik.resetForm();
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ========== Validation ========== */
  const validationSchema = useMemo(() => {
    return Yup.object({
      currentPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,40}$/,
          "Password must start with an uppercase letter and be more than 5 characters"
        )
        .required("Enter Your Current Password"),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,40}$/,
          "Password must start with an uppercase letter and be more than 5 characters"
        )
        .required("Enter Your New Password"),
    });
  }, []);

  /* ========== Formik || Catch Value || Send Data ========== */
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema,
    validate: () => {
      setError(null);
    },
    onSubmit: handleChangePassword,
  });

  return (
    <section className="change-password">
      <h2>Change Password</h2>

      {error && <MessageError errorMes={error} />}

      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 item d-flex align-items-center gap-2 position-relative">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="text"
            id="currentPassword"
            placeholder="Current Password"
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <InputMessageError message={formik.errors.currentPassword} />
        ) : null}

        <div className="my-3 item d-flex align-items-center gap-2 position-relative">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="text"
            id="newPassword"
            placeholder="New Password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <InputMessageError message={formik.errors.newPassword} />
        ) : null}

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || loading}
          className="my-2"
        >
          {loading ? "Loading..." : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
