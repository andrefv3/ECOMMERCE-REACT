import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import './productAdded.css';
import { formatCOP } from "@/utils/formatCurrency";
import { useSelector } from "react-redux";

export const ProductAdded: React.FC<any> = (props: any) => {
    const [addedProduct, setAddedProduct] = useState<any>(null);
    const cartData = useSelector(({ cartData }) => cartData.cart);

    useEffect(() => {
        console.log('Cart Data:', cartData);
        // Buscar el producto por productCode
        const product = cartData.items.find((cartItem: any) => cartItem.productCode === props.productCode);
        console.log('Found Product:', product);
    
        if (product) {
            setAddedProduct(product);
        } else {
            setAddedProduct(null);
        }
    }, [cartData, props.productCode]);
    
    console.log('Added Product:', addedProduct);
    
    if (!addedProduct) {
        console.log('Product not found or loading...');
        return <div>Cargando...</div>;
    }

    return (
        <div className="productAdded">
            <div className="contentProduct">
                <div className="titleP-add flex">
                    <div className="sub-title-add">
                        <CheckCircleIcon className="colorIcon green-icon"/>
                        <span>Añadido a la cesta</span>
                    </div>
                    <button className="closeCartAdded">
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

                <button className="btnProcessPay">Tramitar pedido</button>
            </div>
        </div>
    );
};
