import { TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import cartEmpty from '@/assets/img/cartEmpty.png';
import { cartDTO } from './dto/cartDTO';
import useCart from './cartLogic';
import { Product } from '@/productsData';
import { formatCOP } from '@/utils/formatCurrency';
import './cart.css';

export const CartComponent: React.FC<cartDTO> = () => {
    const {
        cartItems,
        totalQuantity,
        filteredProducts,
        cartBoxRef,
        cartContext,
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

    const renderCartItem = (product: Product) => {
        const cartItem = cartItems.find((item: any) => item.productCode === product.productCode);
    
        if (!cartItem) {
            return null;
        }
    
        return (
            <div className="productsAdded" key={product.productCode}>
                <div className="product-image">
                    <img draggable="false" src={product.imageUrl} alt="Product"/>
                </div>
                <div className="flex info_buttons">
                    <div className="info-product">
                        <div className="flex-price">
                            <span className="price-product">
                                {formatCOP(product.price * cartItem.quantity)}
                            </span>
                            <div className="flex-options">
                                <button className='btnOptionsCart'>
                                    {/* <PencilIcon className='colorIcon' /> */}
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
                                    <TrashIcon className='colorIcon' />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h5 className="title__product">{product.name}</h5>
                        </div>
                    
                        <div className="flex-cant">
                            <p className='size-product'>{cartItem.size}</p>
                            {cartItem.quantity > 1 && (
                                <p className='quantity-info'>{`${cartItem.quantity}x`}</p>
                            )}
                            {formatCOP(product.price)}
                        </div>
                    </div>
                    <div className="rightSec">
                        <div className="options">
                            
                        </div>
                    </div>
                </div>
                <div className="shopcart-footer">
                    <div className="shopcart-footer__content">
                        {/* Puedes agregar contenido adicional aquí si es necesario */}
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
                {totalQuantity === 0 ? renderEmptyCart() : filteredProducts.map((product: Product) => (
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
