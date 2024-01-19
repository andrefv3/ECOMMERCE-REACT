import { HeaderComponent } from "@/components/Header/Header"
import { DetailsProductDTO } from "./dto/detailsProductDTO"
import { FooterComponent } from "@/components/Footer/Footer";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatCOP } from "@/utils/formatCurrency";
import useDetailsProduct from "./detailsProductLogic";
import { useNavigate } from "react-router-dom";
import './detailsProduct.css';

export const DetailsProduct: React.FC<DetailsProductDTO> = () => {    
    const {
        infoCProductRef,
        product,
        selectSize,
        containerFixed,
        handleSizeClick,
        handleAddToCart,
        hovered, 
        setHovered,
        wishlistContext
    } = useDetailsProduct();

    const navigate = useNavigate();

    if (!product) {
        navigate(`/not-found`);
        window.scrollTo(0, 0);
        return null;
    }

    return (
        <>
            <HeaderComponent />
            <section className="info__cproduct relative" ref={infoCProductRef}>
                <div className="images__cproduct">
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-2 gap-2">
                            <li className="product_img_detail">
                                <img src={product.imageUrl} alt={product.name} />
                            </li>
                            <img src={product.imageUrl} alt={product.name} />
                            <img src={product.imageUrl} alt={product.name} />
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                    </div>
                </div>

                <div id="containerProduct" className={containerFixed ? "fixed__details" : ""}>
                    <div className="detail__cproduct">
                        <h2 className="title__cproduct">{product.name}</h2>
                        <h5 className="reference__cproduct">{`Ref ${product.reference}`}</h5>
                        <span className="price__cproduct">{formatCOP(product.price)}</span>

                        <div className="colors__cproduct">
                            <img draggable="false" src={product.imageUrl} />
                        </div>
                        
                        <div className="buttonSize__cproducts">
                            {product.sizes.map((size, index) => (
                                <button key={index} className={`size__cproduct ${selectSize === size ? 'selected' : ''}`} onClick={() => handleSizeClick(size)}>{size}</button>
                            ))}
                        </div>

                        <div className="flex AddWishlistCart">
                            <button
                            className={`btnAddProduct ${hovered && !selectSize ? 'hovered' : ''}`}
                            onClick={() => handleAddToCart(product.id)}
                            onMouseOver={() => setHovered(true)}
                            onMouseOut={() => setHovered(false)}
                            disabled={!selectSize}
                            >
                                {(!selectSize && hovered) ? 'Selecciona talla' : 'Añadir a la cesta'}
                            </button>
                            <div className="btn__wishlist__cproduct" onClick={() => wishlistContext.handleWishlistClick(product.id)}>
                                {wishlistContext.selectedIdx.includes(product.id) ? (
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