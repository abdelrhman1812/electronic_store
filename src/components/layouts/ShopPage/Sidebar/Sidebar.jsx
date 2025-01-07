import { useFormik } from "formik";
import React from "react";
import { IoIosClose } from "react-icons/io";
import bgImageDark from "../../../../assets/Images/Hero/bg-1.jpg";
import { useTheme } from "../../../../context/ThemeProvider";
import useData from "../../../../services/Hooks/useData";
import CheckboxItem from "./CheckboxItem";
import PriceFilter from "./PriceFilter";

const Sidebar = ({
  getAllProducts,
  showSidebar,
  setIsLoading,
  toggleSidebar,
}) => {
  const { isDark } = useTheme();
  const { brands, categories, isLoading: dataLoading } = useData();

  // Formik initial values
  const formik = useFormik({
    initialValues: {
      minPrice: 0,
      maxPrice: 2000,
      category: [],
      brand: [],
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await getAllProducts(values);
        if (window.matchMedia("(max-width: 991px)").matches) {
          toggleSidebar();
        }
      } catch (error) {
        console.error("Error applying filter: ", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Handle change data
  const handleCheckboxChange = (type) => (e) => {
    const { value, checked } = e.target;
    const currentValues = formik.values[type];
    if (checked) {
      formik.setFieldValue(type, [...currentValues, value]);
    } else {
      formik.setFieldValue(
        type,
        currentValues.filter((item) => item !== value)
      );
    }
  };

  // Clear filter
  const clearFilter = async () => {
    const resetValues = {
      minPrice: 0,
      maxPrice: 2000,
      category: [],
      brand: [],
    };
    formik.resetForm({ values: resetValues });
    await getAllProducts(resetValues);
    if (window.matchMedia("(max-width: 991px)").matches) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`col-lg-3 p-3 h-100 ${!showSidebar ? "show-sidebar" : ""}`}
      style={{
        backgroundImage: `url(${isDark ? bgImageDark : ""})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <IoIosClose
        size={30}
        onClick={toggleSidebar}
        className="text-danger ms-auto d-block d-lg-none"
      />

      <h5>Filters</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="filter-category">
          <h6>Category</h6>
          <CheckboxItem
            selectedValues={formik.values.category}
            items={categories}
            isLoading={dataLoading}
            type="category"
            handleCheckboxChange={handleCheckboxChange("category")}
          />
        </div>

        <div className="filter-brand mb-4">
          <h6>Brand</h6>
          <CheckboxItem
            items={brands}
            selectedValues={formik.values.brand}
            isLoading={dataLoading}
            type="brand"
            handleCheckboxChange={handleCheckboxChange("brand")}
          />
        </div>

        <PriceFilter formik={formik} />

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn w-100 border-0"
        >
          Apply Filter
        </button>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          onClick={clearFilter}
          type="button"
          className="btn btn-danger my-2 w-100 border-0"
        >
          Clear
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;
