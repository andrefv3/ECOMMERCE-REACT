import React, { useEffect, useRef, useState } from 'react';
import './carousel.css';

const imagesData = [
    { name: 'Image 1', url: '/static/collections/new-collection-banner.png', colorTitles: 'black'},
    { name: 'Image 2', url: '/static/collections/accesorios-collection-banner.png', colorTitles: 'white' },
    { name: 'Image 3', url: '/static/collections/sudaderas-collection-banner.png', colorTitles: 'black' },
];

export const Carousel: React.FC<any> = () => {  
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        const carouselElement = carouselRef.current;

        if (carouselElement) {
            const slides = Array.from(carouselElement.querySelectorAll('.swiper-slide'));
            const totalSlides = slides.length;
            const carouselWidth = carouselElement.offsetWidth;

            setCarouselWidth(carouselWidth);

            const autoplayInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % totalSlides;

                // Cambiar dirección cuando llega al último o al primer slide
                if (nextIndex === 0) {
                    carouselElement.style.transition = 'none';
                    carouselElement.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        carouselElement.style.transition = 'transform 2s ease';
                    }, 10);
                } else {
                    carouselElement.style.transform = `translateX(-${carouselWidth * nextIndex}px)`;
                }

                slides[currentIndex].setAttribute('aria-hidden', 'true');
                slides[currentIndex].setAttribute('tabIndex', '-1');
                slides[nextIndex].setAttribute('aria-hidden', 'false');
                slides[nextIndex].setAttribute('tabIndex', '0');

                slides[currentIndex].classList.remove('swiper-slide-active');
                slides[nextIndex].classList.add('swiper-slide-active');

                setCurrentIndex(nextIndex);
            }, 6000);

            return () => clearInterval(autoplayInterval);
        }
    }, [currentIndex, carouselWidth]);

    return (
        <section className='slide-carousel'>
            <div className="swiper-wrapper" ref={carouselRef} style={{ display: 'flex', transition: 'transform 2s ease' }}>
                {imagesData.map((image, index) => (
                    <div key={index} className={`swiper-slide ${currentIndex === index ? 'swiper-slide-active' : ''}`} aria-hidden={currentIndex === index ? 'false' : 'true'} tabIndex={currentIndex === index ? 0 : -1}>
                        <article className="shopi-slide is-full-height">
                            <div className="image-container">
                                <span className="image-item-wrapper">
                                    <img src={image.url} draggable="false" alt={image.name} className="image-item" style={{ width: '100%' }} />
                                </span>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
}

