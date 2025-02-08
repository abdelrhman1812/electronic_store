import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../services/Apis/categoryApi/CategoryApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";

const CategoryList = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const itemsPerPage = 5;

  // hook for curds categories
  const { loading, entities, fetch } = useEntityManagement("category", {
    fetchEntities: getCategories,
    addEntity: addCategory,
    updateEntity: updateCategory,
    deleteEntity: deleteCategory,
  });
  const navigate = useNavigate();

  // Table
  const header = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  useEffect(() => {
    fetch();
  }, []);
  const handleUpdate = (item) => {
    navigate(`/admin/categories/${item._id}`, { replace: true });
  };

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
            onUpdate={handleUpdate}
            loading={loading.fetch}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
