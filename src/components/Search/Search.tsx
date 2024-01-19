import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatCOP } from "@/utils/formatCurrency";
import SearchEmpty from '@/assets/img/searchEmpty.png';
import useSearch from "./searchLogic";
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
        //cartContext,
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

            <div className="content--wrapper" style={{ marginTop: `${boxSearchHeight + 80}px` }}>
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
                                        <div className="c-image-responsive cursor-pointer" onClick={() => handleOpenDetails(product.id)}>
                                            <figure className="figure" onMouseEnter={() => handleToggleSizes(product.id, true)} onMouseLeave={() => handleToggleSizes(product.id, false)}>
                                                <div className="overlay"></div>
                                                <img draggable="false" className="image-responsive" lazy-load-status="is-loaded" src={product.imageUrl} />
                                                {showSizes[product.id] && (
                                                    <div className="sizes" onClick={(e) => e.stopPropagation()} >
                                                        <p>Seleccione talla</p>
                                                        <div className="sizesContainer">
                                                            {/* {product.sizes.map((size: string) => (
                                                                <button key={size} className="sizeProduct" onClick={() => cartContext.handleCartClick(product.productCode, size, 0)}>
                                                                    {size}
                                                                </button>
                                                            ))} */}
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
                                                {wishlistContext.selectedIdx.includes(product.id) ? (
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