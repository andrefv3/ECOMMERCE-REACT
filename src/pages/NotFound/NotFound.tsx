import { Link } from 'react-router-dom';
import LogoSHOPI from '@/assets/svg/Logo';
import './notFound.css';

function NotFound() {
    return (
        <>
            <div className="boxLogoNF">
                <Link to="/" className='LogoNotFound'>
                    <LogoSHOPI color={"#000"} width={104} />
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