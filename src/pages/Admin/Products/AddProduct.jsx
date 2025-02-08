import FormAddProduct from "../../../components/layouts/Admin/ProductManagement/FormAddProduct";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";

const AddProduct = () => {
  return (
    <>
      <PageHeader title="Add Product" />
      <div className="container-xxl">
        <FormAddProduct />
      </div>
    </>
  );
};

export default AddProduct;
