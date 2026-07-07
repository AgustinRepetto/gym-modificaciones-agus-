import { useState } from "react";
import styles from "./Carousel.module.css";

export function CustomCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay imágenes, no renderizamos nada roto
  if (!images || images.length === 0) {
    return (
      <div className={styles.carouselEmpty}>
        No hay imágenes disponibles
      </div>
    );
  }

  const isSingleImage = images.length === 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselWrapper}>
      {/* Contenedor de la imagen actual */}
      <div className={styles.carouselSlider}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>

      {/* Controles: Solo se muestran si hay más de una imagen */}
      {!isSingleImage && (
        <>
          <button className={`${styles.navButton} ${styles.left}`} onClick={prevSlide}>
            &#10094; {/* Icono < */}
          </button>
          <button className={`${styles.navButton} ${styles.right}`} onClick={nextSlide}>
            &#10095; {/* Icono > */}
          </button>

          {/* Indicadores puntitos opcionales de abajo */}
          <div className={styles.indicators}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}