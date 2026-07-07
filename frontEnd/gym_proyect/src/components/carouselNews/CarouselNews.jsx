import { useState } from "react";
import styles from "./CarouselNews.module.css"

export function CarouselNews({items = []}){
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!items || items.length === 0){
        return(
            <div className={styles.carouselEmpty}>
                No hay noticas vigentes en este momento.
            </div>
        );
    }
    const isSingleItem = items.length === 1;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
             prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? items.length - 1 : prevIndex -1 
    );
    };
    const activeItem = items[currentIndex];

    return (
        <div className={styles.carouselWrapper}>
            <div className={styles.carouselSlider}>
                <article className={styles.newsSlideCard}>
                    <div className={styles.slideHeader}>
                        <span className={styles.slideBadge}>Noticia importante</span>
                        <span className={styles.slideId}>#{activeItem.id}</span>
                    </div>
                    <p className={styles.slideText}>{activeItem.description}</p>
                </article>
            </div>

            {!isSingleItem &&(
                <>
                <button className={`${styles.navButton} ${styles.left}`} 
                onClick={prevSlide}>
                    ❮
                </button>
                <button className={`${styles.navButton} ${styles.right}`}
                onClick={nextSlide}>
                    ❯
                </button>

                <div className={styles.indicators}>
                    {items.map((_, index) => (
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
    )
}