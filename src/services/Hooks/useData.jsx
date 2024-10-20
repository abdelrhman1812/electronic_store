import { useEffect, useState } from "react";
import { getBrands } from "../Apis/brandApi/brandApi";
import { getCategories } from "../Apis/categoryApi/CategoryApi";
import { getProducts } from "../Apis/productApi/ProductApi";

const useData = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData, brandsData] = await Promise.all([
        getProducts(),
        getCategories(),
        getBrands(),
      ]);
      setProducts(productsData.products);
      setCategories(categoriesData.categories);
      setBrands(brandsData.brands);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, categories, brands, isLoading, error };
};

export default useData;
