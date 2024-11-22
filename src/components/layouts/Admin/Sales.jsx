import { BiDollar, BiDollarCircle, BiShoppingBag } from "react-icons/bi"; // Make sure you have imported this
import SalesItem from "./SalesItem";

const Sales = () => {
  return (
    <section className="sales">
      <div className="container-xl">
        <div className="row g-3">
          <SalesItem
            title="Total Sales"
            amount="$54,458.98"
            icon={<BiDollar size={30} />}
          />
          <SalesItem
            title="Average Order"
            amount="$54,458.98"
            icon={<BiDollarCircle size={30} />}
          />
          <SalesItem
            title="Total Order"
            amount="$54,458"
            icon={<BiShoppingBag size={30} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Sales;
