import { useState } from "react";
import "../../../../../assets/style/product.css";
import TabContent from "./TabContent";
import Tabs from "./Taps";

const ProductTabs = ({ product, updateProductReviews }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="container-xl p-0 ">
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabContent
        activeTab={activeTab}
        product={product}
        updateProductReviews={updateProductReviews}
      />
    </div>
  );
};

export default ProductTabs;
