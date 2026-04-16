import { BiDollar } from "react-icons/bi";

const PriceFilter = ({ formik }) => {
  return (
    <div className="filter-price mb-4 px-1">
      <h6>Price Range</h6>
      
      <div className="range-controls mt-2">
        <div className="price-input-group mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small font-weight-bold">Min Price</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2">
              <BiDollar className="mb-1" />{formik.values.minPrice}
            </span>
          </div>
          <input
            type="range"
            className="form-range custom-range"
            min="0"
            max="100000"
            step="100"
            name="minPrice"
            value={formik.values.minPrice}
            onChange={formik.handleChange}
          />
        </div>

        <div className="price-input-group mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small font-weight-bold">Max Price</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2">
              <BiDollar className="mb-1" />{formik.values.maxPrice}
            </span>
          </div>
          <input
            type="range"
            className="form-range custom-range"
            min="0"
            max="100000"
            step="100"
            name="maxPrice"
            value={formik.values.maxPrice}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
