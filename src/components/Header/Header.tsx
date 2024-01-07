import { headerDTO } from './dto/headerDTO';
import Logo from '@/assets/svg/Logo.svg';
import LogoWhite from '@/assets/svg/Logo-white.svg'
import Tooltip from '../Tooltip/Tooltip';
import { ShoppingBagIcon, UserIcon, HeartIcon } from '@heroicons/react/24/solid'
import useHeader from './headerLogic';
import WishlistComponent from '../Wishlist/Wishlist';
import products from '@/productsData';
import './header.css';

export const HeaderComponent: React.FC<headerDTO> = (props: headerDTO) => {

    const {
        scrolled,
        //WISHLIST
        isOpen, 
        selectedIdx,
        openWishlist, 
        closeWishlist,
        removeFromWishlist,
    } = useHeader({
        toggleWishlist: props.toggleWishlist,
        type: props.type
    });
    
    return (
        <>
            <header className="relative">
                <nav className={`${props.type === "main" ? 'fixed' : ''} w-full z-20 top-0 start-0  border-gray-200 ${
                    scrolled ? 'bg-white' : 'transparent'
                }`}>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full p-4">
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto " id="navbar-sticky">
                            <ul className="flex flex-col font-medium items-center md:flex-row md:mt-0 md:border-0">
                                <li className='gender'>
                                    <a href="#" className={`block py-2 text-gray-900 md:bg-transparent md:p-0 aria-current="page ${!scrolled && props.type === 'main' ? 'c-white' : ''}`}>Mujer</a>
                                </li>
                                <div className="divider rounded "></div>
                                <li className={`gender c-main-nav ${!scrolled && props.type === 'main' ? 'c-main-nav-white' : ''}`}>
                                    <a href="#" className={`block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${!scrolled && props.type === 'main' ? 'c-white' : ''}`}>Hombre</a>
                                </li>                      
                            </ul>
                        </div>
                        <a href="/" className={`h-8 Logo`}>
                            <img src={!scrolled && props.type === 'main' ? LogoWhite : Logo} className={`h-8 ${!scrolled ? 'logo__white' : ''}`} draggable="false" alt="Shopi Logo" />
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div className="flex cartOptions">
                                <Tooltip text="Iniciar sesión">
                                    <a className="pointer-c">
                                        <UserIcon className={`colorIcon ${!scrolled && props.type === 'main' ? 'c-white' : ''}`} />
                                    </a>
                                </Tooltip>
                                <Tooltip text="Carrito">
                                    <a className='pointer-c'>
                                        <ShoppingBagIcon className={`colorIcon ${!scrolled && props.type === 'main' ? 'c-white' : ''}`} />
                                    </a>
                                </Tooltip>
                                <Tooltip text="Wishlist">
                                    <a className="pointer-c" onClick={() => openWishlist()}>
                                        <HeartIcon className={`colorIcon ${!scrolled && props.type === 'main' ? 'c-white' : ''}`} />
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
        
            {isOpen && (
                <WishlistComponent
                    products={products}
                    selectedIdx={selectedIdx}
                    onClose={() => closeWishlist()}
                    onSelectedIdxChange={removeFromWishlist}
                />
            )}
        </>
    );
}