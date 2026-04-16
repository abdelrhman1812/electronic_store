import { useFormik } from "formik";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useData from "../../../../services/Hooks/useData";
import CheckboxItem from "./CheckboxItem";
import PriceFilter from "./PriceFilter";

const Sidebar = ({
  getAllProducts,
  showSidebar,
  setIsLoading,
  toggleSidebar,
}) => {
  const { brands, categories, isLoading: dataLoading } = useData();

  // Formik initial values
  const formik = useFormik({
    initialValues: {
      minPrice: 0,
      maxPrice: 100000,
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
        currentValues.filter((item) => item !== value),
      );
    }
  };

  // Clear filter
  const clearFilter = async () => {
    const resetValues = {
      minPrice: 0,
      maxPrice: 100000,
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
    <aside className={`col-lg-3 ${showSidebar ? "show-sidebar" : ""}`}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5>
          <BiFilterAlt className="text-primary" />
          Filters
        </h5>
        <IoIosCloseCircleOutline
          size={28}
          onClick={toggleSidebar}
          className="text-muted cursor-pointer d-lg-none"
        />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="filter-category mb-4">
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

        <div className="sidebar-actions d-flex flex-column gap-2 mt-4">
          <button type="submit" className="btn btn-apply w-100">
            Apply Filters
          </button>
          <button
            onClick={clearFilter}
            type="button"
            className="btn btn-clear w-100 mt-1"
          >
            Clear All
          </button>
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
