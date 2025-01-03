import "../../../../../assets/style/product.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <div
        className="nav nav-tabs border-0 d-flex justify-content-center align-items-center"
        id="product-tab"
        role="tablist"
      >
        <button
          className={`nav-link ${activeTab === "description" ? "active" : ""}`}
          id="description-tab"
          type="button"
          role="tab"
          aria-controls="description"
          aria-selected={activeTab === "description"}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
          id="reviews-tab"
          type="button"
          role="tab"
          aria-controls="reviews"
          aria-selected={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <button
          className={`nav-link d-none d-md-block ${
            activeTab === "shipping-returns" ? "active" : ""
          }`}
          id="shipping-returns-tab"
          type="button"
          role="tab"
          aria-controls="shipping-returns"
          aria-selected={activeTab === "shipping-returns"}
          onClick={() => setActiveTab("shipping-returns")}
        >
          Shipping & Returns
        </button>
        <button
          className={`nav-link ${activeTab === "faq" ? "active" : ""}`}
          id="faq-tab"
          type="button"
          role="tab"
          aria-controls="faq"
          aria-selected={activeTab === "faq"}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </div>
    </nav>
  );
};

export default Tabs;
