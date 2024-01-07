import { Link } from 'react-router-dom';
import Logo from '@/assets/svg/Logo.svg';
import './notFound.css';

function NotFound() {
    return (
        <>
            <div className="boxLogoNF">
                <Link to="/" className='LogoNotFound'>
                    <img src={Logo} draggable="false" alt="Shopi Logo" />
                </Link>
            </div>
            <div id="PageNotFound">
                <div className="textNotFound">
                    <span>
                        Lo sentimos, no tenemos un resultado para tu búsqueda
                    </span>
                    <Link to="/">
                        <button className='btnReturnMain'>Ir a la página principal</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;