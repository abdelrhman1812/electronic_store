import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import {
  addBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../../../services/Apis/brandApi/brandApi";
import { useEntityManagement } from "../../../services/Hooks/admin/useEntityManagement";
import { IsLoading, PageHeader } from "../../ProductDetails";

const BrandList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const itemsPerPage = 5;
  const {
    loading: { isLoading },
    entities,
    fetch,
  } = useEntityManagement("brand", {
    fetchEntities: getBrands,
    addEntity: addBrand,
    updateEntity: updateBrand,
    deleteEntity: deleteBrand,
  });
  const navigate = useNavigate();
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
    console.log(item);
    updateBrand(item);
    navigate(`/admin/brands/${item._id}`, { replace: true });
  };

  return (
    <>
      <PageHeader title="Brands" />

      <div className="container-xl py-5">
        <div className="row g-3">
          {isLoading ? (
            <IsLoading />
          ) : (
            <>
              <DynamicTable
                header={header}
                data={entities}
                limitPerPage={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setLimit={setLimit}
                onUpdate={handleUpdate}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandList;
