import React, { useState, useEffect } from 'react';
import './Carousel.css';
import slide1 from '../../assets/images/Carousel/slide1.jpg';
import slide2 from '../../assets/images/Carousel/slide2.jpg';
import slide3 from '../../assets/images/Carousel/slide3.jpg';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    { image: slide1, alt: 'Valorant Slide 1' },
    { image: slide2, alt: 'Valorant Slide 2' },
    { image: slide3, alt: 'Valorant Slide 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const goToNextSlide = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <section className="carousel-container">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`slide ${index === activeIndex ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.alt} />
        </div>
      ))}
      <button className="prev-btn" onClick={goToPrevSlide}>←</button>
      <button className="next-btn" onClick={goToNextSlide}>→</button>
    </section>
  );
};

export default Carousel; 