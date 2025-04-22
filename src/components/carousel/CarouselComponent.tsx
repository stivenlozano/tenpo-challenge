import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { CarouselProps } from "../../types";
import './CarouselComponent.css';

const CarouselComponent: React.FC<CarouselProps> = ({ slides, tags, btnTitle, autoSlide = false, autoSlideInterval = 5000, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoSlide, autoSlideInterval])

  return (
    <div className="carousel">
      <div className="carousel__slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((item, index) => (
          <div key={index} className='carousel__item'>
            <img className="carousel__item-image" key={index} src={item.backdrop_path} alt={`slide-${index}`} />

            <div className='carousel__item-content'>
              <h1 className='carousel__item-title'>{item.title}</h1>

              <span className='carousel__item-tags'>
                {
                  item.genre_ids.map((tagId) => {
                    const tag = tags.find((i) => i.id === tagId);
                    return tag ? tag.name : '';
                  }).join(', ')
                }
              </span>

              <p className='carousel__item-description'>{item.overview}</p>

              <button className='carousel__item-button' onClick={() => onClick(item.id)}>{btnTitle}</button>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn left" onClick={prevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button className="carousel-btn right" onClick={nextSlide}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <span key={index} className={`dot ${currentIndex === index ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  )
}

export default CarouselComponent;