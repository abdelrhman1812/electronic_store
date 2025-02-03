import FormAddProduct from "../../../components/layouts/Admin/ProductManagement/FormAddProduct";
import useAddProduct from "../../../components/layouts/Admin/ProductManagement/useAddProduct";
import PageHeader from "../../../components/shared/PageHeader/PageHeader";

const AddProduct = () => {
  const { formik, loading, toggleModal } = useAddProduct();
  return (
    <>
      <PageHeader title="Add Product" />
      <div className="container-xxl">
        <FormAddProduct
          formik={formik}
          loading={loading}
          toggleModal={toggleModal}
        />
      </div>
    </>
  );
};

export default AddProduct;
