import { TrashIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import wishEmpty from '@/assets/img/wishlistEmpty.png';
import { wishlistDTO, Product } from './dto/wishlistDTO';
import useWishlist from './wishlistLogic';
import './wishlist.css';

export const WishlistComponent: React.FC<wishlistDTO> = (props: wishlistDTO) => {
    
    const {
        filteredProducts,
        wishlistBoxRef,
        handleRemoveFromWishlist
    } = useWishlist({
        onClose: props.onClose,
        onSelectedIdxChange: props.onSelectedIdxChange,
        selectedIdx: props.selectedIdx,
        products: props.products
    });

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
        <div className="productsAdded">
            <div className="product-image">
                <img draggable="false" src={product.imageUrl} alt="Product"/>
            </div>
            <div className="flex info_buttons">
                <div className="info-product">
                    <span className="price-product">
                        {product.price}
                    </span>
                    <div>
                        <h5 className="title__product">{product.name}</h5>
                    </div>
                    <p className='size-product'>S</p>
                </div>
                <div className="rightSec">
                    <div className="options">
                        <button className='btnOptionsWish'>
                            <ShoppingBagIcon className='colorIcon' />
                        </button>
                        <button className='btnOptionsWish' onClick={() => handleRemoveFromWishlist(product.productCode)}>
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
                    <button className='iconClose' onClick={props.onClose}>
                        <XMarkIcon className='colorIcon' />
                    </button>
                </div>
                <div className="carousel">
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
