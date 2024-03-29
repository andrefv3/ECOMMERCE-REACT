import { headerDTO } from './dto/headerDTO';
import {UserIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ProductAdded } from '../Cart/components/productAdded/ProductAdded';
import { SearchComponent } from '../Search/Search';
import LogoSHOPI from '@/assets/svg/Logo';
import Tooltip from '../Tooltip/Tooltip';
import useHeader from './headerLogic';
import CartComponent from '../Cart/Cart';
import CartHeart from '@/assets/svg/CartIcon';
import './header.css';

export const HeaderComponent: React.FC<headerDTO> = (props: headerDTO) => {

    const {
        scrolled,
        getClassColor,
        getColorHeader,
        //WISHLIST
        animationKey,
        //CART
        isOpenCart, 
        addedProduct,
        productAdded,
        openCart,
        //SEARCH
        isOpenSearch, 
        openSearch, 
        closeSearch
    } = useHeader({
        type: props.type
    });
    
    return (
        <>
            <header className={`${!isOpenSearch ? 'relative' : 'fixedHeader'}`} id="Header__contain">
                <nav className={`${isOpenSearch || props.type === "main" ? 'fixed' : ''} w-full z-20 top-0 start-0  border-gray-200 ${
                    scrolled || isOpenSearch ? 'bg-white' : 'transparent'
                }`}>
                    <div className="header__shopi flex flex-wrap items-center justify-between mx-auto w-full">
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto " id="navbar-sticky">
                            <ul className="flex flex-col font-medium items-center md:flex-row md:mt-0 md:border-0">
                                <li className='gender'>
                                    <a href="#" className={`block py-2 text-gray-900 md:bg-transparent md:p-0 aria-current="page ${getClassColor()}`}>Mujer</a>
                                </li>
                                <div className="divider rounded "></div>
                                <li className={`gender c-main-nav ${!isOpenSearch && (!scrolled && props.type === 'main') ? 'c-main-nav-white' : ''}`}>
                                    <a href="#" className={`block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${getClassColor()}`}>Hombre</a>
                                </li>                      
                            </ul>
                        </div>
                        <a href="/" className={`h-8 Logo`}>
                            <LogoSHOPI color={getColorHeader()} width={99} height={32} />
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div className="flex cartOptions">
                                    {!isOpenSearch ? (
                                        <a className='pointer-c' onClick={() => openSearch()}>
                                            <div className="search">
                                                <MagnifyingGlassIcon className={`colorIconHeader ${getClassColor()}`}/>
                                                <span className={getClassColor()}>Buscar</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <Tooltip text="Cerrar">
                                            <a className='pointer-c' onClick={() => closeSearch()}>
                                                <XMarkIcon className='colorIconHeader'/>
                                            </a>
                                        </Tooltip>
                                    )}
                                <Tooltip text="Iniciar sesión">
                                    <a className="pointer-c">
                                        <UserIcon className={`colorIconHeader ${getClassColor()}`} />
                                    </a>
                                </Tooltip>
                                <Tooltip text="Cesta">
                                    <a className='pointer-c' onClick={() => openCart()}>
                                        <CartHeart color={getColorHeader()} width={34} height={34} type={animationKey ? true : false} />
                                    </a>
                                </Tooltip>
                            </div>
                        
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {isOpenCart && (
                <CartComponent />
            )}

            {isOpenSearch && (
                <SearchComponent />
            )}

            {addedProduct && productAdded && (
                <ProductAdded productCode={productAdded.productCode} size={productAdded.size} color={productAdded.color} />
            )}
        </>
    );
}