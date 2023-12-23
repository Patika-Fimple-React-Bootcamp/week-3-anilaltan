import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ImageCarousel = ({ imagesArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const image = imagesArray.map((image) => {
    return (
      <img
        className={styles.carouselImage}
        key={image}
        src={image}
        alt={`Slide ${currentIndex}`}
      />
    );
  });

  const handleClickPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imagesArray.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleClickNext = () => {
    if (currentIndex === imagesArray.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselImageContainer}>{image[currentIndex]}</div>

      <div className={styles.carouselButtonContainer}>
        <button className={styles.carouselButtonPrev} onClick={handleClickPrev}>
          Prev
        </button>
        <button className={styles.carouselButtonNext} onClick={handleClickNext}>
          Next
        </button>
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  imagesArray: PropTypes.array,
};

export default ImageCarousel;
