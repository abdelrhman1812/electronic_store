import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useUserContext } from "../../../context/UserContext";
import notify from "../../../lib/notify";
import { updateUserAccount } from "../../../services/Apis/userApi/userApi";
import InputsForm from "./InputsForm";

const UpdateUserForm = ({ setIsUpdate, isUpdate }) => {
  const { getUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserData = async (values) => {
    setLoading(true);
    setError(null);

    const updatedValues = {};

    if (values.name) updatedValues.name = values.name;
    if (values.email) updatedValues.email = values.email;
    if (values.address) updatedValues.address = values.address;
    if (values.phone) updatedValues.phone = values.phone;

    try {
      const data = await updateUserAccount(updatedValues);
      console.log(data);
      if (data?.success) {
        notify("success", "Success User updated");
        getUser();
        formik.resetForm();
        setIsUpdate(!isUpdate);
      }
    } catch (error) {
      setError(
        "There was an error updating your data. Please try again.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name should be at least 3 characters")
        .max(50, "Name should not exceed 50 characters"),
      email: Yup.string().email("Invalid email address"),
      address: Yup.string().max(
        100,
        "Address should not exceed 100 characters"
      ),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must be only digits")
        .min(10, "Phone number should be at least 10 digits"),
    }),
    onSubmit: updateUserData,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {error && <p className="text-danger">{error}</p>}
      <InputsForm
        label="Name"
        id="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
      />
      <InputsForm
        label="Email"
        id="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />
      <InputsForm
        label="Address"
        id="address"
        type="text"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && formik.errors.address}
      />
      <InputsForm
        label="Phone"
        id="phone"
        type="tel"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && formik.errors.phone}
      />
      <button
        type="submit"
        disabled={!(formik.isValid && formik.dirty) || loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
      <button
        className="bg-danger mx-3"
        onClick={() => setIsUpdate(!isUpdate)}
        type="button"
      >
        Cancel
      </button>
    </form>
  );
};

export default UpdateUserForm;
