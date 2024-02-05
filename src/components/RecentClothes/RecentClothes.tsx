import './recentClothes.css';
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { RecentClothesDTO } from './dto/recentClothesDTO';
import useRecentClothes from './recentClothesLogic';
import { formatCOP } from '@/utils/formatCurrency';
import { Sizes } from '@/productsData';
import Tooltip from '../Tooltip/Tooltip';

export const RecentClothes: React.FC<RecentClothesDTO> = (props: RecentClothesDTO) => {
    const {
        selectedIdx,
        wishlistContext,
        showSizes, 
        cartContext,
        selectedColors,
        // handleColorChange,
        handleToggleSizes,
        handleOpenDetails,
    } = useRecentClothes();

    return (
        <section id="RecentProducts">
            <h2 className="title__section text-4xl font-bold mb-8">Te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {props.products.map((product, index) => (
                    <div key={index} className="c-image">
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
                                    <div className="sizes" onClick={(e) => e.stopPropagation()} >
                                        <p>Seleccione talla</p>
                                        <div className="sizesContainer">
                                            {product.sizes.map((size: Sizes) => (
                                                 size.stockQuantity === 0 ? (
                                                    <Tooltip key={size.id} text={size.stockQuantity === 0 ? 'Agotado' : ''} type='SoldOut'>
                                                        <button key={size.id} className={`sizeProduct ${size.stockQuantity === 0 ? 'btnSizeDisabled' : ''}`} disabled={size.stockQuantity === 0} onClick={() => cartContext.handleCartClick(product.id, size.id, 0)}>
                                                            {size.name}
                                                        </button>
                                                    </Tooltip>
                                                ) : (
                                                    <button key={size.id} className={`sizeProduct ${size.stockQuantity === 0 ? 'btnSizeDisabled' : ''}`} disabled={size.stockQuantity === 0} onClick={() => cartContext.handleCartClick(product.id, size.id, 0)}>
                                                        {size.name}
                                                    </button>
                                                )
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
                            <div className="btn__wishlist" onClick={() => wishlistContext.handleWishlistClick(product.id)}>
                                {selectedIdx && selectedIdx.includes(product.id) ? (
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