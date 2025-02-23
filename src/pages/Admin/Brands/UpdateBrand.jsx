import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SharedForm from "../../../components/layouts/Admin/SharedForm";
import {
  getBrands,
  getSingleBrands,
  updateBrand,
} from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";
import { PageHeader } from "../../ProductDetails";

const UpdateBrand = () => {
  const { loading, formik, error, handleUpdate } = useEntityManagement(
    "brand",
    { fetchEntities: getBrands, updateEntity: updateBrand }
  );
  const { id } = useParams();
  const [brand, setBrand] = useState(null);

  /* ========= Get Single Brand =========*/

  const getBrand = async () => {
    const date = await getSingleBrands(id);
    setBrand(date.brand);
    handleUpdate(date?.brand);
  };

  useEffect(() => {
    getBrand();
  }, []);
  return (
    <>
      <PageHeader title={"Update Brand"} />
      <SharedForm
        error={error}
        formik={formik}
        loading={loading.submit}
        type={"brand"}
        onSubmit={formik.handleSubmit}
        currentEntityId={brand}
      />
    </>
  );
};

export default UpdateBrand;
