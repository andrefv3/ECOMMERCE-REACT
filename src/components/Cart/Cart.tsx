import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatCOP } from '@/utils/formatCurrency';
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import cartEmpty from '@/assets/img/cartEmpty.png';
import useCart from './cartLogic';
import { CartItem } from '@/contexts/dto/context.dto';
import './cart.css';

export const CartComponent: React.FC = () => {
    const {
        orderTotal,
        totalQuantity,
        filteredProducts,
        products,
        cartBoxRef,
        cartContext,
        wishlistContext
    } = useCart();

    const renderEmptyCart = () => (
        <div className="emptyCart">
            <img draggable="false" src={cartEmpty} alt="Empty Cart"/>
            <h2>Cesta vacía</h2>
            <p>¡Oh, parece que tu cesta está esperando a ser llenada! Explora nuestra selección y descubre algo especial para añadir a tu compra.</p>
            <a href="/">
                <button>Descubrir</button>
            </a>
        </div>
    );

    const renderCartItem = (product: CartItem) => {
        const cartProduct = products.find(item => Number(item.id) === product.productCode);

        if (!cartProduct) {
            return null;
        }
    
        return (
            <div className="productsAdded" key={product.productCode}>
                <div className="product-image">
                    {cartProduct.images.map(image => (
                        (image.seqNum === 1) && (image.colorId === product.color) && (
                            <img
                                key={image.seqNum}
                                draggable="false"
                                className="image-responsive "
                                lazy-load-status="is-loaded"
                                src={image.url}
                                alt={image.name}
                            />
                        )
                    ))}
                </div>
                <div className="info_buttons">
                    <div className="info-product">
                        <div className="flex-price">
                            <span className="price-product">
                                {formatCOP(cartProduct.price * product.quantity)}
                            </span>
                            <div className="flex-options">
                                <button className='btnOptionsCart'>
                                    <svg
                                        version="1.1"
                                        viewBox="0 0 18 18"
                                        className="action-icons svg-icon svg-fill"
                                        aria-hidden="true"
                                    >
                                        <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.265 4.845L7.24 12.87l-2.11-2.111 5.777-5.777 1.055 1.055a.801.801 0 001.132 0 .8.8 0 000-1.131L12.037 3.85l1.116-1.116a.802.802 0 011.132 0l.98.98a.8.8 0 010 1.131zM5.18 14.93l-2.453.342.342-2.453.928-.928 2.111 2.111-.928.928zM16.397 2.582l-.98-.98c-.906-.905-2.487-.906-3.395 0L1.747 11.877a.802.802 0 00-.226.456L.996 16.1a.8.8 0 00.903.903l3.767-.525a.802.802 0 00.456-.226L16.397 5.977A2.386 2.386 0 0017.1 4.28c0-.642-.249-1.245-.702-1.698z"
                                        fill="#000"
                                        />
                                    </svg>
                                </button>
                                <span className="vertical-divider"></span>
                                <button className='btnOptionsCart' onClick={() => cartContext.removeFromCart(product.productCode)}>
                                    <TrashIcon className='colorIcon stroke-2' />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h5 className="title__product">{cartProduct.name}</h5>
                        </div>
                    
                        <div className="flex-cant">
                            <p className='size-product'>{product.size}</p>
                            {product.quantity > 1 && (
                                <p className='quantity-info'>{`${product.quantity}x`}</p>
                            )}
                            {formatCOP(cartProduct.price)}
                        </div>
                    </div>
                </div>
                <div className="shopcart-footer">
                    <div className="shopcart-footer__content">
                        <div className="order-total">
                            <div className="order-total__content">
                                <div className="order-total__title-wrapper">
                                    <span className="order-total__title">Total</span> 
                                    <span className="legal order-total__legal-text">(IVA Incluido)</span>
                                </div>

                                <div className="order-total__price-wrapper">
                                    <div className="order-total__price-and-touch">
                                        <div className="price-elem order-total__price price-grid">
                                            <span data-qa-anchor="productItemPrice" className="current-price-elem">{formatCOP(orderTotal)}</span>
                                        </div> 
                                    </div>
                                </div>

                            </div>
                            <button className="button" data-qa-anchor="processOrderBtn">
                                Tramitar pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="contain-cart">
            <div className="cart__box" ref={cartBoxRef}>
                <div className="sec-title">
                    <h3 className='titleCart'>Cesta ({totalQuantity})</h3>
                    <button className='iconClose' onClick={() => cartContext.closeCart()}>
                        <XMarkIcon className='colorIcon' />
                    </button>
                </div>
                <div className="carousel-cart">
                    <div className="box_button_wishlist">
                        <a href="/wishlist">
                            <button className='btnWishlist'>
                                <span>
                                    {wishlistContext.selectedIdx.length != 0 ? (
                                        <HeartIconSolid className='colorIcon redIcon' />
                                    ) : (
                                        <HeartIcon className='colorIcon' />
                                    )}
                                </span>
                                <span>Favoritos ({wishlistContext.selectedIdx.length})</span>
                            </button>
                        </a>
                    </div>
                    {cartContext.cartItems.length === 0 ? renderEmptyCart() : filteredProducts.map((product) => (
                        <div key={product.productCode}>
                            {renderCartItem(product)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
