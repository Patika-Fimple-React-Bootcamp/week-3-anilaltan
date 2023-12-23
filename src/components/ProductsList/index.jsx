import { useProducts } from "../../context/productsContext";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCarousel from "../ImageCarousal";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const { productsCopy, setProductsCopy, loading, error } = useProducts();
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    const newImagesArray = productsCopy.map((product) => product.image);
    setImagesArray(newImagesArray);
  }, [productsCopy]);

  const handleDelete = (productId) => {
    try {
      setProductsCopy(
        productsCopy.filter((product) => product.id !== productId)
      );
      toast.success("Success Notification !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      toast.error(`Error Notification ! ${err}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className={styles.productsListContainer}>
      <h1>Products List</h1>
      <ImageCarousel imagesArray={imagesArray} />
      {loading && <span className={styles.loader}></span>}
      {error && <span>{error}</span>}
      <div className={styles.productCards}>
        {productsCopy.map((product) => (
          <ProductCard
            key={product.id}
            data={product}
            handleDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductsList;
