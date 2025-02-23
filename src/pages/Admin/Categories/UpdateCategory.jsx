import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SharedForm from "../../../components/layouts/Admin/SharedForm";
import {
  getCategories,
  getSingleCategory,
  updateCategory,
} from "../../../services/Apis/categoryApi/CategoryApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const UpdateCategory = () => {
  const { loading, formik, error, handleUpdate } = useEntityManagement(
    "category",
    { fetchEntities: getCategories, updateEntity: updateCategory }
  );

  const { id } = useParams();
  const [category, setCategory] = useState(null);

  /* ========= Get Single Category =========*/
  const getCategory = async () => {
    const date = await getSingleCategory(id);
    setCategory(date.category);
    handleUpdate(date?.category);
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
