import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import EditProductModal from "../EditProductModal";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  handleIsModalOpen = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { data, handleDelete } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src={data.image}
          alt={`Product: ${data.title}`}
        />
        <div className={styles.productDetails}>
          <div className={styles.productTitle}>{data.title}</div>
          <div className={styles.productPrice}>Price: ${data.price}</div>
        </div>
        <div className={styles.productActions}>
          <button
            className={[styles.actionButton, styles.deleteButton]}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={[styles.actionButton, styles.editButton]}
            onClick={this.handleIsModalOpen}
          >
            Edit
          </button>
        </div>
        <EditProductModal
          product={data}
          isOpen={isModalOpen}
          handleIsModalOpen={this.handleIsModalOpen}
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default React.memo(ProductCard);
