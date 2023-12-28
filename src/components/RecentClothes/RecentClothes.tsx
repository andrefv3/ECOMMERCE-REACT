import './recentClothes.css';
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react';

export const RecentClothes: React.FC<any> = () => {
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    
    const products = [
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_1.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_2.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_3.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_3.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_3.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_3.jpg?t=1695631766956&amp;imwidth=750" },
        { name: "Sudadera Scarface negra", price: "199,900 COP", imageUrl: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_3.jpg?t=1695631766956&amp;imwidth=750" },
    ];

    const handleWishlistClick = (index: number) => {
        setSelectedIdx((prevSelectedIdx) =>
          prevSelectedIdx.includes(index)
            ? prevSelectedIdx.filter((i) => i !== index)
            : [...prevSelectedIdx, index]
        );
    };

    return (
        <section id="RecentProducts">
            <h1 className="text-4xl font-bold mb-8">The Gifts Shops</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                    <div key={index} className="c-image">
                        <div className="c-image-responsive">
                            <figure className="figure">
                                <div className="overlay"></div>
                                <img draggable="false" alt="Sudadera Scarface negra , NEGRO" className="image-responsive" lazy-load-status="is-loaded" src={product.imageUrl} />
                            </figure>
                        </div>
                        <div className="cproduct-info">
                            <div className="name">
                                <span>{product.name}</span>
                            </div>
                            <div className="price">
                                <span>{product.price}</span>
                            </div>
                            <div className="btn__wishlist" onClick={() => handleWishlistClick(index)}>
                                {selectedIdx.includes(index) ? (
                                    <HeartIconSolid className='colorIcon redIcon' />
                                ) : (
                                    <HeartIcon className='colorIcon' />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}