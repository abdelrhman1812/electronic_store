import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import notify from "../../../../lib/notify";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../../services/Apis/productApi/productApi";

const useAddProduct = () => {
  const [loading, setLoading] = useState({ fetch: false, submit: false });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProductId, setCurrentProductId] = useState(null);

  console.log(currentProductId);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const data = await getProducts();
      setProducts(data?.products || []);
      setLoading((prev) => ({ ...prev, fetch: false }));
    } catch (error) {
      console.error("Error fetching products:", error);
      notify("error", "Failed to fetch products. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle add product
  const handleAddProduct = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      // Prepare form data
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images" && values.images.length > 0) {
          Array.from(values.images).forEach((image) => {
            formData.append("images", image);
          });
        } else if (values[key]) {
          formData.append(key, values[key]);
        }
      });

      const { data } = await addProduct(formData);

      if (data.success && data.product) {
        notify("success", "Product added successfully");
        formik.resetForm();
        setProducts((prev) => [...prev, data.product]);
        navigate("/admin/products");
      } else {
        notify("error", "Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      notify("error", "Failed to add product. Please check your inputs.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };
  const handleUpdateProduct = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images" && values.images.length > 0) {
          Array.from(values.images).forEach((image) => {
            formData.append("images", image);
          });
        } else if (key !== "images" && key !== "imageCover" && values[key]) {
          formData.append(key, values[key]);
        }
      });

      if (values.imageCover) {
        formData.append("imageCover", values.imageCover);
      }

      const { data } = await updateProduct(currentProductId, formData);

      if (data.success && data.product) {
        notify("success", "Product updated successfully");
        formik.resetForm();
        setProducts((prev) =>
          prev.map((product) =>
            product._id === data.product._id ? data.product : product
          )
        );
        navigate("/admin/products");
      } else {
        notify("error", "Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      notify("error", "Failed to update product. Please check your inputs.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    try {
      const { data } = await deleteProduct(productId);
      console.log("Deleted product response:", data);

      if (data.success) {
        notify("success", "Product deleted successfully");
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      } else {
        notify("error", "Failed to delete product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      notify("error", "Failed to delete product. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Title must be at least 2 characters long")
      .max(60, "Title must not exceed 60 characters")
      .trim()
      .required("Title is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters long")
      .trim()
      .required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be at least 0"),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock must be at least 0"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    // images: Yup.array().when("$currentProductId", {
    //   is: (currentProductId) => !currentProductId,
    //   then: Yup.array().min(1, "At least one image is required"),
    //   otherwise: Yup.array(),
    // }),
    // imageCover: Yup.mixed().when("$currentProductId", {
    //   is: (currentProductId) => !currentProductId,
    //   then: Yup.mixed().required("Image cover is required"),
    //   otherwise: Yup.mixed(),
    // }),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      brand: "",
      imageCover: null,
      images: [],
    },
    validationSchema,
    onSubmit: currentProductId ? handleUpdateProduct : handleAddProduct,
  });

  return {
    formik,
    loading,
    products,
    fetchProducts,
    handleDeleteProduct,
    handleUpdateProduct,
    setCurrentProductId,
  };
};

export default useAddProduct;
