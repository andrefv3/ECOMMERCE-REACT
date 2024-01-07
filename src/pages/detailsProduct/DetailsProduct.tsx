import { HeaderComponent } from "@/components/Header/Header"
import { DetailsProductDTO } from "./dto/detailsProductDTO"
import { useEffect, useRef, useState } from "react";
import { FooterComponent } from "@/components/Footer/Footer";
import { HeartIcon } from "@heroicons/react/24/outline";
import './detailsProduct.css';

export const DetailsProduct: React.FC<DetailsProductDTO> = () => {
    const [wishlistState, setWishlistState] = useState(false);
    const [containerFixed, setContainerFixed] = useState(false);

    const toggleWishlistState = () => {
        setWishlistState(!wishlistState);
    };

    const infoCProductRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (infoCProductRef.current) {
          const infoCProductRect = infoCProductRef.current.getBoundingClientRect();
  
          setContainerFixed(infoCProductRect.top <= 0);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
        <>
            <HeaderComponent 
                toggleWishlist={toggleWishlistState} 
            />
            <section className="info__cproduct relative" ref={infoCProductRef}>
                <div className="images__cproduct">
                    <img src="https://hmcolombia.vtexassets.com/arquivos/ids/3250185-600-900?v=638352868825400000&width=600&height=900&aspect=true" />
                </div>

                <div id="containerProduct" className={containerFixed ? "fixed__details" : ""}>
                    <div className="detail__cproduct">
                        <h2 className="title__cproduct">Hoodie Loose Fit</h2>
                        <h5 className="reference__cproduct">Ref 0115/019/800</h5>
                        <span className="price__cproduct">84,900 COP</span>

                        <div className="colors__cproduct">
                            <img draggable="false" src="https://static.bershka.net/4/photos2/2024/V/0/1/p/0115/019/800/4cda0c77931e2e1cd35c07c100736559-0115019800_2_4_0.jpg?imwidth=124&impolicy=bershka-itxhigh&imformat=chrome" />
                        </div>
                        
                        <div className="buttonSize__cproducts">
                            <button className="size__cproduct">S</button>
                        </div>

                        <div className="flex AddWishlistCart">
                            <button className="btnAddProduct">{"Añadir a la cesta"}</button>
                            {/* <div className="btn__wishlist" onClick={() => handleWishlistClick(product.productCode)}>
                                {selectedIdx.includes(product.productCode) ? (
                                    <HeartIconSolid className='colorIcon redIcon' />
                                ) : (
                                    <HeartIcon className='colorIcon' />
                                )}
                            </div> */}
                            <div className="btn__wishlist__cproduct">
                                <HeartIcon className='colorIcon' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </>
    )
}