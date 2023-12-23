import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useProducts } from "../../context/productsContext";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductModal = ({ product, isOpen, handleIsModalOpen }) => {
  const { setProductsCopy } = useProducts();
  const [editedProduct, setEditedProduct] = useState({ title: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price } = editedProduct;
    try {
      setProductsCopy((current) =>
        current.map((item) => {
          if (item.id === product.id) {
            return { ...item, title: title, price: price };
          }
          return item;
        })
      );
      toast.success("Success Notification !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error(`Error Notification ! ${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    handleIsModalOpen();
  };

  const afterOpenModal = () => {
    setEditedProduct({ title: product.title, price: product.price });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  Modal.defaultStyles.content.margin = "auto";
  Modal.defaultStyles.content.width = "max-content";
  Modal.defaultStyles.content.height = "max-content";

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Edit Product"
        onAfterOpen={afterOpenModal}
        ariaHideApp={false}
      >
        <h2>Edit Product</h2>
        <form className={styles.editProductForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title:</label>
            <textarea
              name="title"
              id="title"
              value={editedProduct.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={styles.cancelButton}
              onClick={() => {
                handleIsModalOpen();
                toast.warning("Warning Notification !", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }}
            >
              Cancel
            </button>
            <button className={styles.submitButton} type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

EditProductModal.propTypes = {
  product: PropTypes.object,
  isOpen: PropTypes.bool,
  handleIsModalOpen: PropTypes.func,
};

export default EditProductModal;
