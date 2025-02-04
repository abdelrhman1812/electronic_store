import SharedForm from "../../../components/layouts/Admin/SharedForm";
import {
  addBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const FormAddBrand = () => {
  const { loading, currentEntityId, formik, error } = useEntityManagement(
    "brand",
    {
      fetchEntities: getBrands,
      addEntity: addBrand,
      updateEntity: updateBrand,
      deleteEntity: deleteBrand,
    }
  );

  return (
    <>
      <SharedForm
        error={error}
        formik={formik}
        loading={loading.submit}
        type={"brand"}
        onSubmit={formik.handleSubmit}
        currentEntityId={currentEntityId}
      />
    </>
  );
};

export default FormAddBrand;
