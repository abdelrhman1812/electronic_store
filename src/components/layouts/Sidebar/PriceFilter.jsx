const PriceFilter = ({ formik }) => {
  return (
    <>
      <section className="filter-price mb-4">
        <h6>Price</h6>
        <div className=" mt-4 p-2 d-flex align-items-center">
          <input
            type="range"
            className="form-range"
            min="50"
            max="2000"
            name="minPrice"
            value={formik.values.minPrice}
            onChange={formik.handleChange}
          />
          <span className="mx-2">{formik.values.minPrice}</span>
        </div>
        <div className=" my-2 p-2 d-flex align-items-center">
          <input
            type="range"
            className="form-range"
            min="50"
            max="2000"
            name="maxPrice"
            value={formik.values.maxPrice}
            onChange={formik.handleChange}
          />
          <span className="mx-2">{formik.values.maxPrice}</span>
        </div>
      </section>
    </>
  );
};

export default PriceFilter;
