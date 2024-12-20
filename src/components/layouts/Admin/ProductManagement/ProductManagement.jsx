import FormAddProduct from "./FormAddProduct";
import ProductList from "./ProductList";
import useAddProduct from "./useAddProduct";

const ProductManagement = () => {
  const {
    formik,
    handleDeleteProduct,
    products,
    loading,
    toggleModal,
    isOpen,
  } = useAddProduct();

  return (
    <section className="p-2">
      <button
        onClick={toggleModal}
        className="icon-btn add-btn position-relative overflow-hidden"
      >
        <div className="add-icon"></div>
        <div className="btn-txt">AddProduct</div>
      </button>
      {isOpen && (
        <FormAddProduct
          formik={formik}
          loading={loading}
          toggleModal={toggleModal}
        />
      )}
      <ProductList
        products={products}
        loading={loading}
        handleDeleteProduct={handleDeleteProduct}
      />
    </section>
  );
};

export default ProductManagement;
