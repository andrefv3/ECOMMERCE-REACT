import './recentClothes.css';
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { RecentClothesDTO } from './dto/recentClothesDTO';
import useRecentClothes from './recentClothesLogic';
import { formatCOP } from '@/utils/formatCurrency';

export const RecentClothes: React.FC<RecentClothesDTO> = (props: RecentClothesDTO) => {
    const {
        selectedIdx,
        wishlistContext,
        showSizes, 
        cartContext,
        handleToggleSizes,
        handleOpenDetails,
    } = useRecentClothes();

    return (
        <section id="RecentProducts">
            <h1 className="title__section text-4xl font-bold mb-8">The Gifts Shops</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {props.products.map((product, index) => (
                    <div key={index} className="c-image">
                        <div className="c-image-responsive cursor-pointer" onClick={() => handleOpenDetails(product.productCode)}>
                            <figure className="figure" onMouseEnter={() => handleToggleSizes(product.productCode, true)} onMouseLeave={() => handleToggleSizes(product.productCode, false)}>
                                <div className="overlay"></div>
                                <img draggable="false" alt="Sudadera Scarface negra , NEGRO" className="image-responsive" lazy-load-status="is-loaded" src={product.imageUrl} />
                                {showSizes[product.productCode] && (
                                    <div className="sizes" onClick={(e) => e.stopPropagation()} >
                                        <p>Seleccione talla</p>
                                        <div className="sizesContainer">
                                            {product.sizes.map((size: string) => (
                                                <button key={size} className="sizeProduct" onClick={() => cartContext.handleCartClick(product.productCode, size, 0)}>
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
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
                ))}
            </div>
        </section>
    );
}