import React, {useEffect, useState} from 'react';
import './style.css';

const GetCarousel = ({ images, timer = 5000}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
            const timer = setTimeout(() => {
                goToNext();
            }, 3000)
            return () => clearTimeout(timer)
    }, [currentIndex]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                        key={index}
                    >
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
            <button className="prev" onClick={goToPrevious}>
                &#10094;
            </button>
            <button className="next" onClick={goToNext}>
                &#10095;
            </button>
            <div className="indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default GetCarousel;
