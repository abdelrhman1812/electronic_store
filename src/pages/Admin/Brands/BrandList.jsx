import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import {
  addBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";
import { PageHeader } from "../../ProductDetails";

const BrandList = () => {
  const { loading, entities, fetch, handleDelete } = useEntityManagement(
    "brand",
    {
      fetchEntities: getBrands,
      addEntity: addBrand,
      updateEntity: updateBrand,
      deleteEntity: deleteBrand,
    }
  );
  const navigate = useNavigate();

  /* ========= Pagination =========*/
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const itemsPerPage = 5;

  /* ========= Header for Table =========*/
  const header = [
    { key: "name", name: "Name" },
    { key: "image", name: "Image" },
  ];

  /* ========= Handle Add Brand ======== */
  const handleUpdateSingleBrand = useCallback(
    (item) => navigate(`/admin/brands/${item._id}`, { replace: true }),
    [navigate]
  );

  /* ========= Handle Delete Brand ======== */
  const handleDeleteBrand = useCallback(
    async (id) => {
      await handleDelete(id);
    },
    [handleDelete]
  );

  const handleDeleteBrands = useCallback(
    async (ids) => {
      console.log("Deleting brands:", ids);
      await Promise.all(ids.map((id) => handleDelete(id)));
    },
    [handleDelete]
  );

  /* ========= Get All Brands ======== */
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <PageHeader title="Brands" />

      <div className="container-xl py-5">
        <div className="row g-3">
          <DynamicTable
            header={header}
            data={entities}
            limitPerPage={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setLimit={setLimit}
            onUpdate={handleUpdateSingleBrand}
            loading={loading.fetch}
            onDelete={handleDeleteBrand}
            onMultipleDelete={handleDeleteBrands}
          />
        </div>
      </div>
    </>
  );
};

export default BrandList;
