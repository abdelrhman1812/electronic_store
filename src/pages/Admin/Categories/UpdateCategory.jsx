import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SharedForm from "../../../components/layouts/Admin/SharedForm";
import {
  addCategory,
  deleteCategory,
  deleteSingleCategory,
  getCategories,
  updateCategory,
} from "../../../services/Apis/categoryApi/CategoryApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const { loading, formik, error } = useEntityManagement("category", {
    fetchEntities: getCategories,
    addEntity: addCategory,
    updateEntity: updateCategory,
    deleteEntity: deleteCategory,
  });

  const getCategory = async () => {
    const date = await deleteSingleCategory(id);
    setCategory(date.category);
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <SharedForm
        error={error}
        formik={formik}
        loading={loading.submit}
        type={"category"}
        onSubmit={formik.handleSubmit}
        currentEntityId={category}
      />
    </>
  );
};

export default UpdateCategory;
