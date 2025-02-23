import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../services/Apis/categoryApi/CategoryApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";
import { PageHeader } from "../../ProductDetails";

const CategoryList = () => {
  const { loading, entities, fetch, handleDelete } = useEntityManagement(
    "category",
    {
      fetchEntities: getCategories,
      addEntity: addCategory,
      updateEntity: updateCategory,
      deleteEntity: deleteCategory,
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

  /* ========= Update Single Category =========*/
  const handleUpdateSingleCategory = useCallback(
    (item) => navigate(`/admin/categories/${item._id}`, { replace: true }),
    [navigate]
  );

  /* ========= Delete Category =========*/
  const handleDeleteCategory = useCallback(
    async (id) => {
      await handleDelete(id);
    },
    [handleDelete]
  );

  const handleDeleteCategories = useCallback(
    async (ids) => {
      console.log("Deleting multiple categories:", ids);
      await Promise.all(ids.map((id) => handleDelete(id)));
    },
    [handleDelete]
  );

  /* ========= Get All Categories =========*/
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <PageHeader title="Categories" />

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
            onUpdate={handleUpdateSingleCategory}
            loading={loading.fetch}
            onDelete={handleDeleteCategory}
            onMultipleDelete={handleDeleteCategories}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
