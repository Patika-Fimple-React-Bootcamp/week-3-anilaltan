import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../useFetch";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsCopy, setProductsCopy] = useState([]);
  const { data, loading, error } = useFetch();

  useEffect(() => {
    const copyData = JSON.parse(JSON.stringify(data));
    setProductsCopy(copyData);
  }, [data]);

  const values = { productsCopy, setProductsCopy, loading, error };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useProducts = () => useContext(ProductsContext);
