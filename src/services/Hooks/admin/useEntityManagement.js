import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import notify from "../../../lib/notify";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must not exceed 20 characters")
    .required("Name is required"),
  image: Yup.mixed().required("Image is required"),
});

// make hook take endpoint and type
export const useEntityManagement = (
  entityType,
  { fetchEntities, addEntity, updateEntity, deleteEntity }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState({ fetch: false, submit: false });
  const [entities, setEntities] = useState([]);
  const [currentEntityId, setCurrentEntityId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /* ========== Fetch Entities ========== */
  const fetch = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const data = await fetchEntities();
      setEntities(data?.[`${entityType}s`] || []);
      if (entityType === "category") setEntities(data?.categories || []);
    } catch (error) {
      console.error(`Error fetching ${entityType}s:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  /* ========== Handler Add Entity ========== */
  const handleAdd = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);

      const { data } = await addEntity(formData);
      if (data.success) {
        notify("success", `${entityType} added successfully`);
        formik.resetForm();
        setIsOpen(false);
        setEntities((prev) => [...prev, data[entityType]]);
        const path =
          entityType === "category" ? "/admin/categories" : "/admin/brands";
        navigate(path);
      }
    } catch (error) {
      console.error(`Error adding ${entityType}:`, error);
      notify("error", `Failed to add ${entityType}.`);
      setError(error.response?.data?.message || "Failed to add entity.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Handler Update Entity ========== */

  const handleUpdate = (entity) => {
    setCurrentEntityId(entity);
    formik.setValues({
      name: entity?.name || "",
      image: null,
    });
  };

  /* ========== Handler Edit Entity ========== */
  const handleEdit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) {
      formData.append("image", values.image);
    }

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const { data } = await updateEntity(currentEntityId._id, formData);
      if (data.message.includes("Success Update")) {
        notify("success", `${entityType} updated successfully`);
        setEntities((prev) =>
          prev.map((entity) =>
            entity._id === currentEntityId._id ? data[entityType] : entity
          )
        );
        const path =
          entityType === "category" ? "/admin/categories" : "/admin/brands";
        navigate(path);
        formik.resetForm();
      }
    } catch (error) {
      console.error(`Error updating ${entityType}:`, error);
      notify("error", `Failed to update ${entityType}.`);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Handler Delete Entity ========== */
  const handleDelete = async (id) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    try {
      await deleteEntity(id);
      notify("success", `${entityType} deleted successfully`);
      setEntities((prev) => prev.filter((entity) => entity._id !== id));
    } catch (error) {
      console.error(`Error deleting ${entityType}:`, error);
      notify("error", `Failed to delete ${entityType}.`);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: { name: "", image: null },
    validationSchema,
    validate: () => {
      setError(null);
    },
    onSubmit: currentEntityId ? handleEdit : handleAdd,
  });

  return {
    error,
    isOpen,
    loading,
    entities,
    currentEntityId,
    formik,

    handleUpdate,
    handleDelete,
    fetch,
  };
};
