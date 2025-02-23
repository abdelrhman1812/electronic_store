import FormAddProduct from "../../../components/layouts/Admin/ProductManagement/FormAddProduct";
import { PageHeader } from "../../ProductDetails";

const UpdateProduct = () => {
  return (
    <>
      <PageHeader title="Update Product" />
      <div className="container-xxl">
        <FormAddProduct />
      </div>
    </>
  );
};

export default UpdateProduct;
