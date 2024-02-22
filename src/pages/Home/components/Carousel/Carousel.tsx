import React, { useEffect, useRef, useState } from 'react';
import './carousel.css';

const imagesData = [
    { name: 'Image 1', url: 'https://images.unsplash.com/photo-1479968129048-7372423067cf?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', colorTitles: 'black'},
    { name: 'Image 2', url: 'https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', colorTitles: 'black' },
    { name: 'Image 3', url: 'https://images.unsplash.com/photo-1508255139162-e1f7b7288ab7?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', colorTitles: 'black' },
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

