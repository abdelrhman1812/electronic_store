import { useFormik } from "formik";
import { BiMessageSquareX } from "react-icons/bi";
import bgImageDark from "../../../../assets/Images/Hero/bg-1.jpg";
import { useTheme } from "../../../../context/ThemeProvider";
import useData from "../../../../services/Hooks/useData";
import CheckboxItem from "./CheckboxItem";
import PriceFilter from "./PriceFilter";

const Sidebar = ({
  getAllProducts,
  showSidBar,
  setIsLoading,
  showSidBarHandler,
}) => {
  const { isDark } = useTheme();

  const { brands, categories, isLoading: dataLoading } = useData();

  // catch Value
  const getValues = async (values) => {
    setIsLoading(true);
    try {
      await getAllProducts(values);

      const mediaQuery = window.matchMedia("(max-width: 991px)");
      if (mediaQuery.matches) {
        showSidBarHandler();
      }
    } catch (error) {
      console.error("Error applying filter: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial Values
  const formik = useFormik({
    initialValues: {
      minPrice: 0,
      maxPrice: 2000,
      category: [],
      brand: [],
    },
    onSubmit: getValues,
  });

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const category = formik.values.category;
    if (checked) {
      formik.setFieldValue("category", [...category, value]);
    } else {
      formik.setFieldValue(
        "category",
        category.filter((item) => item !== value)
      );
    }
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    const brand = formik.values.brand;
    if (checked) {
      formik.setFieldValue("brand", [...brand, value]);
    } else {
      formik.setFieldValue(
        "brand",
        brand.filter((item) => item !== value)
      );
    }
  };

  // clear filters
  const clearFilter = async () => {
    const resetValues = {
      minPrice: 0,
      maxPrice: 2000,
      category: [],
      brand: [],
    };
    formik.resetForm({ values: resetValues });
    await getAllProducts(resetValues);
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    if (mediaQuery.matches) {
      showSidBarHandler();
    }
  };

  return (
    <aside
      className={`col-lg-3 p-3 h-100 ${!showSidBar ? "show-sidebar" : ""}`}
      style={{
        backgroundImage: `url(${isDark ? bgImageDark : ""})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Icon */}
      <BiMessageSquareX
        size={30}
        onClick={showSidBarHandler}
        className=" text-danger ms-auto d-block d-lg-none"
      />

      <h5>Filters</h5>
      <form onSubmit={formik.handleSubmit}>
        {/* Category Filter */}
        <div className="filter-category">
          <h6>Category</h6>
          <CheckboxItem
            selectedValues={formik.values.category}
            items={categories}
            isLoading={dataLoading}
            type="category"
            handleCheckboxChange={handleCategoryChange}
          />
        </div>

        {/* Brand Filter */}
        <div className="filter-brand mb-4">
          <h6>Brand</h6>
          <CheckboxItem
            items={brands}
            selectedValues={formik.values.brand}
            isLoading={dataLoading}
            type="brand"
            handleCheckboxChange={handleBrandChange}
          />
        </div>

        {/* Price Filter */}
        <PriceFilter formik={formik} />

        {/* Apply and Clear Buttons */}
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
