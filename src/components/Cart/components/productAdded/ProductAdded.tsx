import React from 'react';
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { formatCOP } from "@/utils/formatCurrency";
import { productAddedDTO } from './dto/productAddedDTO';
import useProductAdded from './productAddedLogic';
import './productAdded.css';

export const ProductAdded: React.FC<productAddedDTO> = (props: productAddedDTO) => {
    const {
        isVisible,
        addedProduct,
        cartContext,
        viewCart,
        handleMouseEnter,
        handleMouseLeave
    } = useProductAdded({
        productCode: props.productCode,
        size: props.size
    });

    if (!addedProduct || !isVisible) {
        return null;
    }

    return (
        <div
            id="productAdded"
            className="productAdded"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="contentProduct">
                <div className="titleP-add flex">
                    <div className="sub-title-add">
                        <CheckCircleIcon className="colorIcon green-icon"/>
                        <span>Añadido a la cesta</span>
                    </div>
                    <button className="closeCartAdded" onClick={() => cartContext.closeAddedProduct()}>
                        <XMarkIcon className="colorIcon"/>
                    </button>
                </div>

                <div className="flex-info">
                    <div className="product-image">
                        <img draggable="false" src={addedProduct.imageUrl} alt={addedProduct.name}/>
                    </div>
                    <div className="info-product-add">
                        <span className="price-product-add">
                            {formatCOP(addedProduct.price)}
                        </span>
                        <div>
                            <h5 className="title__product">{addedProduct.name}</h5>
                        </div>
                        <p className='size-product'>{props.size}</p>
                    </div>
                </div>

                <button className="btnProcessPay" onClick={viewCart}>Tramitar pedido</button>
                <span className='viewCart' onClick={viewCart}>Ver cesta ({cartContext.cantCart()})</span>
            </div>
        </div>
    );
};
