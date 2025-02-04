import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SharedForm from "../../../components/layouts/Admin/SharedForm";
import {
  addBrand,
  deleteBrand,
  getBrands,
  getSingleBrands,
  updateBrand,
} from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const UpdateBrand = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const { loading, formik, error } = useEntityManagement("brand", {
    fetchEntities: getBrands,
    addEntity: addBrand,
    updateEntity: updateBrand,
    deleteEntity: deleteBrand,
  });

  const getBrand = async () => {
    const date = await getSingleBrands(id);
    setBrand(date.brand);
  };

  useEffect(() => {
    getBrand();
  }, []);
  return (
    <>
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
