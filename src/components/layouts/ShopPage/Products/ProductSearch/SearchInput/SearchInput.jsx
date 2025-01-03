import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { searchProducts } from "../../../../../../services/Apis/productApi/ProductApi";
import ProductOption from "./ProductOption";

const SearchInput = () => {
  // Store Value of search input || Get last search from local storage
  const [query, setQuery] = useState(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    return lastSearch || "";
  });

  // This Options that is shown in the dropdown
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(
    debounce(async (searchQuery) => {
      // In the beginning , I checked if the searchQuery is empty Or No
      // If it is empty then return
      // if no empty ==> This means it get value from local storage

      if (!searchQuery) return;
      setLoading(true);
      try {
        const data = await searchProducts(searchQuery);

        // Map the products to set options that will be in the dropdown
        const productOptions = data.products.map((product) => ({
          value: product.id,
          label: product.title,
          image: product?.imageCover?.secure_url,
        }));
        setOptions(productOptions);
        console.log("Fetched product options:", productOptions);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    // If the query is empty then return
    // if not empty ==> This means it get value from local storage
    if (query.length > 0) {
      fetchProducts(query);
    } else {
      setOptions([]);
    }
  }, [query, fetchProducts]);

  // Save last search to local storage
  useEffect(() => {
    if (query) {
      localStorage.setItem("lastSearch", query);
      console.log("Saved last search to localStorage:", query);
    }
  }, [query]);

  // Get value from input and set it
  const handleInputChange = (newValue) => {
    setQuery(newValue);
  };

  // const handleChange = (selectedOption) => {
  //   const newQuery = selectedOption ? selectedOption.label : "";
  //   setQuery(newQuery);
  //   console.log("Selected option:", selectedOption);
  // };

  // When menu is open, get the last search from local storage and set it as the input value
  const handleMenuOpen = () => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setQuery(lastSearch);
      fetchProducts(lastSearch);
    }
  };

  return (
    <div className="col-md-6 d-flex justify-content-center align-items-center position-relative z-3">
      <div className="header-search w-md-75">
        <Select
          options={options}
          onInputChange={handleInputChange}
          // onChange={handleChange}
          onMenuOpen={handleMenuOpen}
          isClearable
          isLoading={loading}
          placeholder="Search ..."
          components={{ Option: ProductOption }}
          value={options.find((option) => option.label === query) || null}
        />
      </div>
    </div>
  );
};

export default SearchInput;
