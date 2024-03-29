import { HeaderComponent } from "@/components/Header/Header"
import { DetailsProductDTO } from "./dto/detailsProductDTO"
import { FooterComponent } from "@/components/Footer/Footer";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatCOP } from "@/utils/formatCurrency";
import useDetailsProduct from "./detailsProductLogic";
import Breadcrumb from "@/pages/detailsProduct/components/breadCrumb/breadCrumb";
import { Sizes } from "@/graphql/dto/product-single-dto";
import Tooltip from "@/components/Tooltip/Tooltip";
import './detailsProduct.css';

export const DetailsProduct: React.FC<DetailsProductDTO> = () => {    
    const {
        infoCProductRef,
        product,
        selectSize,
        containerFixed,
        colorIdFromParams,
        zoomedIndex,
        toggleZoom,
        handleSizeClick,
        handleAddToCart,
        handleColorClick,
        // scrollOffset,
        handleMouseDown,
        hovered, 
        setHovered,
        wishlistContext
    } = useDetailsProduct();

    if (!product) {
        return null;
    }

    return (
        <>
            <HeaderComponent />
            <div className="breadCrumb">
                <Breadcrumb currentPage={product.name} category={product.category[0].name}/>
            </div>
            <section className="info__cproduct relative" ref={infoCProductRef}>
                <div className="images__cproduct">
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-2 gap-2">
                            {product.images.map((image, index) => (
                                <li className="product_img_detail" key={index} id={`image_${index}`} onClick={() => toggleZoom(index)} >
                                    <img 
                                        src={image.url} 
                                        alt={image.name} 
                                        key={image.seqNum}
                                        draggable="false"
                                        className={zoomedIndex === index ? 'zoomed' : ''}
                                        onMouseDown={handleMouseDown}
                                    />
                                </li>  
                            ))}
                        </div>
                    </div>
                </div>

                <div id="containerProduct" className={containerFixed ? "fixed__details" : ""}>
                    <div className="detail__cproduct">
                        <h2 className="title__cproduct">{product.name}</h2>
                        <h5 className="reference__cproduct">{`Ref ${product.reference}`}</h5>
                        <span className="price__cproduct">{formatCOP(product.price)}</span>

                        <div className="colors__cproduct">
                            {product.colors.map((color, index) => (
                                <div className={`color__product ${colorIdFromParams === color.id.toString() ? 'active': ''}`} key={index}>
                                    <img 
                                        key={index} 
                                        draggable="false" 
                                        src={color.image} 
                                        alt={color.name} 
                                        title={color.name}
                                        onClick={() => handleColorClick(color.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="buttonSize__cproducts">
                            {product.sizes.map((size: Sizes, index) => (
                                size.stockQuantity === 0 ? (
                                    <Tooltip key={size.id} text={size.stockQuantity === 0 ? 'Agotado' : ''} type='SoldOut'>
                                        <button 
                                            key={index} 
                                            className={`size__cproduct is-disabled ${selectSize === size.id ? 'selected' : ''}`} 
                                            onClick={() => handleSizeClick(size.id)}
                                            disabled={size.stockQuantity === 0}
                                        >
                                            {size.name}
                                        </button>
                                    </Tooltip>
                                ) : (
                                    <button 
                                        key={index} 
                                        className={`size__cproduct ${selectSize === size.id ? 'selected' : ''}`} 
                                        onClick={() => handleSizeClick(size.id)}
                                    >
                                        {size.name}
                                    </button>
                                )
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
                                {wishlistContext.selectedIdx.includes(Number(product.id)) ? (
                                    <HeartIconSolid className='colorIcon redIcon'/>
                                ) : (
                                    <HeartIcon className='colorIcon'/>
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