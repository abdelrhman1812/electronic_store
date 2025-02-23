import SharedForm from "../../../components/layouts/Admin/SharedForm";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";
import {
  addCategory,
  getCategories,
} from "../../../services/Apis/categoryApi/CategoryApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const FormAddCategory = () => {
  const { loading, currentEntityId, formik, error } = useEntityManagement(
    "category",
    { fetchEntities: getCategories, addEntity: addCategory }
  );

  return (
    <>
      <PageHeader title="Add Category" />
      <SharedForm
        error={error}
        formik={formik}
        loading={loading.submit}
        type={"category"}
        onSubmit={formik.handleSubmit}
        currentEntityId={currentEntityId}
      />
    </>
  );
};

export default FormAddCategory;
