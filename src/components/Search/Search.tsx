import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconSolid, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { formatCOP } from "@/utils/formatCurrency";
import SearchEmpty from '@/assets/img/searchEmpty.png';
import useSearch from "./searchLogic";
import Tooltip from "../Tooltip/Tooltip";
import './search.css';

export const SearchComponent: React.FC<any> = () => {
    const {
        search,
        searched,
        filteredProducts,
        scrollTop,
        boxSearchHeight,
        BoxSearchRef,
        suggestions,
        showSizes,
        wishlistContext,
        cartContext,
        count,
        selectedColors,
        // handleColorChange,
        handleInputChange,
        handleEnterKeyPress,
        handleSuggestionClick,
        handleClearSearch,
        handleOpenDetails,
        handleToggleSizes
    } = useSearch();

    return (
        <section id="Search-wrapper" className={search ? 'no-overflow' : ''}>
            {search && !searched && (
                <div className="contain-pop" style={{ top: `${scrollTop}px` }}></div>
            )}
            <div className="containHeader" ref={BoxSearchRef}>
                <div className="controls">
                    <div className="search_bar">
                        <MagnifyingGlassIcon className="colorIcon"/>
                        <input 
                            type="search" 
                            id="search" 
                            value={search}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyPress}
                            enterKeyHint="search" 
                            autoComplete="off" 
                            className="is-capitalized" 
                            placeholder="¿QUÉ ESTÁS BUSCANDO?"
                        />
                        {search && (
                            <button className="btnDeleteWords" onClick={handleClearSearch}>
                                <XCircleIcon className="colorIcon" />
                            </button>
                        )}
                    </div>

                    {filteredProducts.length > 0 && (
                        <div className="relative results search__results__filters">
                            <span className="count__results">{count + `${count != 1 ? ' resultados' : ' resultado'}`}</span>
                            <div className="search-filters">
                                <button className="is-naked is-outline search-filters__tag grid-tag active">
                                    Todos
                                </button>
                                <button className="is-naked is-outline search-filters__tag grid-tag">
                                    Mujer
                                </button>
                                <button className="is-naked is-outline search-filters__tag grid-tag">
                                    Hombre
                                </button>
                                <button className="is-naked is-outline search-filters__tag grid-tag">
                                    SHP Teen
                                </button>
                            </div>
                            <div className="search-results-header__filters-button">
                                <div className="touch-area-wrapper filter-button">
                                    <button className="is-naked-filter">
                                        <span className="icon-container icon-size-24">
                                            <AdjustmentsHorizontalIcon className="colorIcon" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {suggestions.length > 0 && (
                    <div className="suggestions">
                        <ul className="suggestions__list">
                            {suggestions.map((product) => (
                            <li 
                                className="suggestion__item" 
                                key={product.id}
                                onClick={() => handleSuggestionClick(product)}
                            >
                                <MagnifyingGlassIcon className="icon--suggestion" />
                                <a className="suggestion__link">
                                    <span className="highlight">{product.name}</span>
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="content--wrapper" style={{ marginTop: `${boxSearchHeight}px` }}>
                <section className="grid__area">
                    <div className="recommended">
                        {!searched && (
                            <>
                                <h1>RECOMENDADO PARA TI</h1>
                                <div className="scroll_products">
                                    <div className="grid-container">
                                        {Array.from({ length: 15 }, (_, index) => (
                                        <div className="grid-product" key={index}>
                                            <div className="example"></div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {searched && filteredProducts.length > 0 && (
                            <div className="filtered-products grid-container ">
                                {filteredProducts.map((product, index) => (
                                    <div className="c-image" key={index}>
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
                                                            {product.sizes.map((size) => (
                                                                size.stockQuantity === 0 ? (
                                                                    <Tooltip text={size.stockQuantity === 0 ? 'Agotado' : ''} type='SoldOut' key={size.id}>
                                                                        <button key={size.id} className={`sizeProduct ${size.stockQuantity === 0 ? 'btnSizeDisabled' : ''}`} disabled={size.stockQuantity === 0} onClick={() => cartContext.handleCartClick(product.id, size.id, parseInt(selectedColors[product.id.toString()]))}>
                                                                            {size.name}
                                                                        </button>
                                                                    </Tooltip>
                                                                ) : (
                                                                    <button key={size.id} className={`sizeProduct ${size.stockQuantity === 0 ? 'btnSizeDisabled' : ''}`} disabled={size.stockQuantity === 0} onClick={() => cartContext.handleCartClick(product.id, size.id, parseInt(selectedColors[product.id.toString()]))}>
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
                                                {wishlistContext.selectedIdx.includes(Number(product.id)) ? (
                                                    <HeartIconSolid className='colorIcon redIcon' />
                                                ) : (
                                                    <HeartIcon className='colorIcon' />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {searched && filteredProducts.length === 0 && (
                            <div className="noResults">
                                <div className="emptyProducts">
                                    <img src={SearchEmpty} draggable="false"/>
                                    <h2 className="empty--title">Oops!</h2>
                                    <p className="text">No hemos encontrado resultados.</p>
                                    <p className="text">Prueba de nuevo o echa un vistazo a la selección que tenemos para ti.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
}