import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import notify from "../../lib/notify";
import { changePassword } from "../Apis/userApi/userApi";

const PASSWORD_REGEX = /^[A-Z][a-z0-9]{3,40}$/;
const PASSWORD_ERROR_MESSAGE =
  "Password must contain at least 4 characters, one uppercase letter, one lowercase letter, and one number";

export const useChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = useMemo(() => {
    return Yup.object({
      currentPassword: Yup.string()
        .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
        .required("Current password is required"),
      newPassword: Yup.string()
        .matches(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE)
        .required("New password is required")
        .notOneOf(
          [Yup.ref("currentPassword")],
          "New password must be different from the current password"
        ),
    });
  }, []);

  const handleChangePassword = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const data = await changePassword(values);
      if (data?.success) {
        notify("success", "Password changed successfully");
        formik.resetForm();
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleChangePassword,
  });

  return { formik, loading, error };
};
