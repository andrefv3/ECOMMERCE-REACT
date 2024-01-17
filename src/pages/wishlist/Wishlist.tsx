import { HeaderComponent } from "@/components/Header/Header";
import { formatCOP } from "@/utils/formatCurrency";
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import wishEmpty from '@/assets/img/wishlistEmpty.png';
import { Product } from "@/productsData";
import useWishlist from "./wishlistLogic";
import './wishlist.css';

export const Wishlist: React.FC<any> = () => {  
    const {
        handleOpenDetails,
        handleToggleSizes,
        setSelectedSizes,
        handleSizeSelection,
        handleMoveToCart,
        selectedSizes,
        filteredProducts,
        showSizes,
        wishlistContext,
        selectedIdx, 
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
        <>
            <div className="c-image">
                <div className="c-image-responsive cursor-pointer" onClick={() => handleOpenDetails(product.productCode)}>
                    <figure className="figure" onMouseEnter={() => handleToggleSizes(product.productCode, true)} onMouseLeave={() => handleToggleSizes(product.productCode, false)}>
                        <div className="overlay"></div>
                        <img draggable="false" alt="Sudadera Scarface negra , NEGRO" className="image-responsive" lazy-load-status="is-loaded" src={product.imageUrl} />
                        {showSizes[product.productCode] && (
                            <div className="sizes_wishlist" onClick={(e) => e.stopPropagation()} >
                                <p>Seleccione talla</p>
                                <div className="sizesContainer">
                                    {product.sizes.map((size: string) => (
                                        <button key={size} className={`sizeProduct ${selectedSizes[product.productCode] === size ? 'selected' : ''}`} onClick={() => setSelectedSizes({ ...selectedSizes, [product.productCode]: size })}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <button className="btnMoveToCart" onClick={() => {
                                    handleMoveToCart(product);
                                    handleSizeSelection(product.productCode, selectedSizes[product.productCode])}
                                }>Mover a la cesta</button>
                            </div>
                        )}
                    </figure>
                </div>
                <div className="cproduct-info">
                    <div className="name">
                        <span>{product.name}</span>
                    </div>
                    <div className="price">
                        <span>{formatCOP(product.price)}</span>
                    </div>
                    <div className="btn__wishlist" onClick={() => wishlistContext.handleWishlistClick(product.productCode)}>
                        {selectedIdx.includes(product.productCode) ? (
                            <HeartIconSolid className='colorIcon redIcon' />
                        ) : (
                            <HeartIcon className='colorIcon' />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    
    return (
        <section className="wishlistContain">
            <HeaderComponent />
            <div className="titleWishlist">
                <h3>Favoritos ({filteredProducts.length})</h3>
            </div>
            <div className="productWishlist">
                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? renderEmptyWishlist() : filteredProducts.map((product: Product) => (
                        <div key={product.productCode}>
                            {renderWishlistItem(product)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}