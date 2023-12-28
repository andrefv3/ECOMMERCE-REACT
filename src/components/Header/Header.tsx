// import { NavLink } from 'react-router-dom';
import Logo from '@/assets/svg/Logo.svg';
import LogoWhite from '@/assets/svg/Logo-white.svg'
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import './header.css';

export const HeaderComponent: React.FC<any> = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <header className="relative">
            <nav className={`fixed w-full z-20 top-0 start-0  border-gray-200 ${
                scrolled ? 'bg-white' : 'transparent'
            }`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto w-full p-4">
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto " id="navbar-sticky">
                        <ul className="flex flex-col font-medium items-center md:flex-row md:mt-0 md:border-0">
                            <li className='gender'>
                                <a href="#" className={`block py-2 text-gray-900 md:bg-transparent md:p-0 aria-current="page ${!scrolled ? 'c-white' : ''}`}>Mujer</a>
                            </li>
                            <div className="divider rounded "></div>
                            <li className={`gender c-main-nav ${!scrolled ? 'c-main-nav-white' : ''}`}>
                                <a href="#" className={`block py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${!scrolled ? 'c-white' : ''}`}>Hombre</a>
                            </li>                      
                        </ul>
                    </div>
                    <a href="/" className={`h-8 Logo`}>
                        <img src={!scrolled ? LogoWhite : Logo} className={`h-8 ${!scrolled ? 'logo__white' : ''}`} draggable="false" alt="Shopi Logo" />
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="flex cartOptions">
                            <a className=''>
                                <ShoppingBagIcon className={`colorIcon ${!scrolled ? 'c-white' : ''}`} />
                            </a>
                            <a className="" href="">
                                <UserIcon className={`colorIcon ${!scrolled ? 'c-white' : ''}`} />
                            </a>
                        </div>
                       
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}