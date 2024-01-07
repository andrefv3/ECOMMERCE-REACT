import { HeaderComponent } from "@/components/Header/Header"
import { DetailsProductDTO } from "./dto/detailsProductDTO"
import { useEffect, useRef, useState } from "react";
import { FooterComponent } from "@/components/Footer/Footer";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useParams } from "react-router-dom";
import products, { Product } from "@/productsData";
import { useWishlistContext } from "@/contexts/WishlistContext";
import './detailsProduct.css';

export const DetailsProduct: React.FC<DetailsProductDTO> = () => {
    const [wishlistState, setWishlistState] = useState(false);
    const [containerFixed, setContainerFixed] = useState(false);
    const wishlistContext = useWishlistContext();

    const { id } = useParams<{ id?: string }>();
    const productId = id ? parseInt(id, 10) : undefined;
    const product: Product | undefined = productId ? products.find((p) => p.productCode === productId) : undefined;

    const toggleWishlistState = () => {
        setWishlistState(!wishlistState);
    };

    const infoCProductRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (infoCProductRef.current) {
          const infoCProductRect = infoCProductRef.current.getBoundingClientRect();
  
          setContainerFixed(infoCProductRect.top <= 0);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    if (!product) {
        return (
          <div>
            <p>Producto no encontrado.</p>
          </div>
        );
    }

    return (
        <>
            <HeaderComponent 
                toggleWishlist={toggleWishlistState} 
            />
            <section className="info__cproduct relative" ref={infoCProductRef}>
                <div className="images__cproduct">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div id="containerProduct" className={containerFixed ? "fixed__details" : ""}>
                    <div className="detail__cproduct">
                        <h2 className="title__cproduct">{product.name}</h2>
                        <h5 className="reference__cproduct">{`Ref ${product.reference}`}</h5>
                        <span className="price__cproduct">{product.price}</span>

                        <div className="colors__cproduct">
                            <img draggable="false" src={product.imageUrl} />
                        </div>
                        
                        <div className="buttonSize__cproducts">
                            {product.sizes.map((size, index) => (
                                <button key={index} className="size__cproduct">{size}</button>
                            ))}
                        </div>

                        <div className="flex AddWishlistCart">
                            <button className="btnAddProduct">{"Añadir a la cesta"}</button>
                            <div className="btn__wishlist__cproduct" onClick={() => wishlistContext.handleWishlistClick(product.productCode)}>
                                {wishlistContext.selectedIdx.includes(product.productCode) ? (
                                    <HeartIconSolid className='colorIcon redIcon' />
                                ) : (
                                    <HeartIcon className='colorIcon' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </>
    )
}