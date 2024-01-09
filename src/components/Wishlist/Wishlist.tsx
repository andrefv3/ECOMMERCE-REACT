import { TrashIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import wishEmpty from '@/assets/img/wishlistEmpty.png';
import { wishlistDTO } from './dto/wishlistDTO';
import useWishlist from './wishlistLogic';
import { formatCOP } from '@/utils/formatCurrency';
import { Product } from '@/productsData';
import './wishlist.css';

export const WishlistComponent: React.FC<wishlistDTO> = () => { 
    const {
        filteredProducts,
        wishlistBoxRef,
        wishlistContext,
        selectedSizes,
        isDropdownOpen, 
        hovered, 
        setHovered,
        handleSizeSelection,
        handleDropdownEnter,
        handleDropdownLeave,
        setSelectedSizes,
        handleMoveToCart
    } = useWishlist();

    const renderEmptyWishlist = () => (
        <div className="emptyWishlist">
        <img draggable="false" src={wishEmpty} alt="Empty Wishlist"/>
        <h2>No tienes favoritos</h2>
        <p>¿Sabías que renovamos nuestra colección todas las semanas?</p>
        <a href="/">
            <button>Ver novedades</button>
        </a>
        </div>
    );

    const renderWishlistItem = (product: Product) => (
        <div className="productsAddedWishlist">
            <div className="product-image">
                <img draggable="false" src={product.imageUrl} alt="Product"/>
            </div>
            <div className="flex info_buttons">
                <div className="info-product">
                    <span className="price-product">
                        {formatCOP(product.price)}
                    </span>
                    <div>
                        <h5 className="title__product">{product.name}</h5>
                    </div>
                    <div className="addProduct">
                        <div className="custom-select" onMouseEnter={() => handleDropdownEnter(product.productCode)} onMouseLeave={() => handleDropdownLeave(product.productCode)}>
                        <div className="selection-container">
                            <div className={`selected-option ${isDropdownOpen[product.productCode] ? 'open' : ''}`} onClick={() => setSelectedSizes(prevSizes => ({ ...prevSizes, [product.productCode]: prevSizes[product.productCode] || product.sizes[0] }))}>
                            {!isDropdownOpen[product.productCode] && (
                                <>
                                {selectedSizes[product.productCode] ? (
                                    <div className="selected-size">{selectedSizes[product.productCode]}</div>
                                ) : (
                                    <div className="initial-box"><span>Talla</span></div>
                                )}
                                </>
                            )}
                            <div className={`options ${isDropdownOpen[product.productCode] ? 'open' : ''}`}>
                                {product.sizes.map((size) => (
                                <div key={size} className={`option ${selectedSizes[product.productCode] === size ? 'active-option' : ''}`} onClick={() => setSelectedSizes({ ...selectedSizes, [product.productCode]: size })}>
                                    {size}
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className="expander-icon forms-arrow">
                            <ChevronDownIcon className='colorIcon'/>
                        </div>
                        </div>

                        <button
                            className={`btnMoveProduct ${!isDropdownOpen[product.productCode] && !selectedSizes[product.productCode] ? 'disabled' : ''}`}
                            onMouseEnter={() => setHovered(product.productCode)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => {
                                handleMoveToCart(product);
                                handleSizeSelection(product.productCode, selectedSizes[product.productCode]);
                            }}
                        >
                            {hovered === product.productCode && !isDropdownOpen[product.productCode] && !selectedSizes[product.productCode] ? "Escoge Talla" : "Mover a cesta"}
                        </button>
                        <button className='btnOptionsWish' onClick={() => wishlistContext.removeFromWishlist(product.productCode)}>   
                            <TrashIcon className='colorIcon' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="contain-wishlist">
            <div className="wishlist__box" ref={wishlistBoxRef}>
                <div className="sec-title">
                    <h3 className='titleWishlist'>Wishlist ({filteredProducts.length})</h3>
                    <button className='iconClose' onClick={() => wishlistContext.closeWishlist()}>
                        <XMarkIcon className='colorIcon' />
                    </button>
                </div>
                <div className="carousel-wishlist">
                    {filteredProducts.length === 0 ? renderEmptyWishlist() : filteredProducts.map((product: Product) => (
                        <div key={product.productCode}>
                        {renderWishlistItem(product)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistComponent;
