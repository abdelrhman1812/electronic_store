import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../../../components/common/StarRating";
import DynamicTable from "../../../components/layouts/Admin/DynamicTable";
import useAddProduct from "../../../components/layouts/Admin/ProductManagement/useAddProduct";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";

const ProductList = () => {
  const { products, handleDeleteProduct, loading } = useAddProduct();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Table
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
      custom: (item) => <StarRating rate={item?.rateNum} maxStars={5} />,
    },
    {
      key: "imageCover",
      name: "image",
    },
    {
      key: "images",
      name: "Images",
    },
  ];

  const handleDelete = async (id) => {
    await handleDeleteProduct(id);
  };

  const handleDeleteMultiple = useCallback(
    async (ids, setSelectedIds) => {
      await Promise.all(ids.map((id) => handleDeleteProduct(id)));
      setSelectedIds([]);
    },
    [handleDeleteProduct],
  );

  const handleUpdateSingleProduct = useCallback(
    (item) => navigate(`/admin/products/${item._id}`, { replace: true }),
    [navigate],
  );

  return (
    <div className="product-list">
      <PageHeader title="Products" />

      <div className="container-xl py-5">
        <div className="row g-3">
          <DynamicTable
            onDelete={handleDelete}
            onMultipleDelete={handleDeleteMultiple}
            header={header}
            data={products}
            limitPerPage={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setLimit={setLimit}
            loading={loading.fetch}
            onUpdate={handleUpdateSingleProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
