import { HeaderComponent } from "@/components/Header/Header";
import { formatCOP } from "@/utils/formatCurrency";
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import wishEmpty from '@/assets/img/wishlistEmpty.png';
import useWishlist from "./wishlistLogic";
import './wishlist.css';
import { ProductSingle } from "@/graphql/dto/product-single-dto";

export const Wishlist: React.FC<any> = () => {  
    const {
        handleOpenDetails,
        handleToggleSizes,
        setSelectedSizes,
        handleSizeSelection,
        handleMoveToCart,
        selectedSizes,
        selectedColors,
        filteredProducts,
        showSizes,
        wishlistContext,
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

    const renderWishlistItem = (product: ProductSingle) => (
        <>
            <div className="c-image">
                <div className="c-image-responsive cursor-pointer" onClick={() => handleOpenDetails(product.id, selectedColors[product.id.toString()])}>
                    <figure className="figure" onMouseEnter={() => handleToggleSizes(product.id, true)} onMouseLeave={() => handleToggleSizes(product.id, false)}>
                        <div className="overlay"></div>
                        {product.images
                            .filter(image => selectedColors[product.id.toString()] === null || image.colorId.toString() === selectedColors[product.id.toString()])
                            .map(filteredImg => (
                                filteredImg.seqNum === 1 && (
                                    <img
                                        key={filteredImg.seqNum}
                                        draggable="false"
                                        className="image-responsive"
                                        lazy-load-status="is-loaded"
                                        src={filteredImg.url}
                                        alt={filteredImg.name}
                                        width="571"
                                        height="857"
                                    />
                                )
                        ))}
                        {showSizes[product.id] && (
                            <div className="sizes_wishlist" onClick={(e) => e.stopPropagation()} >
                                <p>Seleccione talla</p>
                                <div className="sizesContainer">
                                    {product.sizes.map((size, index) => (
                                        <button key={index} className={`sizeProduct ${selectedSizes[product.id] === size.id ? 'selected' : ''}`} onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size.id })}>
                                            {size.name}
                                        </button>
                                    ))}
                                </div>
                                <button className="btnMoveToCart" onClick={() => {
                                    handleMoveToCart(product);
                                    handleSizeSelection(product.id, selectedSizes[product.id])}
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
                    <div className="btn__wishlist" onClick={() => wishlistContext.handleWishlistClick(product.id)}>
                        {wishlistContext.selectedIdx.includes(Number(product.id)) ? (
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
                    {filteredProducts.length === 0 ? renderEmptyWishlist() : filteredProducts.map((product: ProductSingle) => (
                        <div key={product.id}>
                            {renderWishlistItem(product)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}