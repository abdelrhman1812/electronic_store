import SharedForm from "../../../components/layouts/Admin/SharedForm";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";
import { addBrand, getBrands } from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const FormAddBrand = () => {
  const { loading, currentEntityId, formik, error } = useEntityManagement(
    "brand",
    { fetchEntities: getBrands, addEntity: addBrand }
  );

  return (
    <>
      <PageHeader title="Add Brand" />

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
