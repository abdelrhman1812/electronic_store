import { BiFilter } from "react-icons/bi";

const TapFilter = ({ showSidBarHandler }) => {
  return (
    <section className="tap-filter">
      <div className="d-flex justify-content-end align-items-center mb-4">
        <BiFilter
          onClick={showSidBarHandler}
          className="mx-3 d-block d-lg-none"
          size={30}
        />
        <select className="form-select w-auto">
          {/* <option value="most-popular">Most Popular</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option> */}
        </select>
      </div>
    </section>
  );
};

export default TapFilter;
