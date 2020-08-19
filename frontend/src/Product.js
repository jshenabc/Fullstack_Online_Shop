import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'

function Product({id, name, description, price, stockQuantity, img }) {

    const [{basket}, dispatch] = useStateValue();

    const addBasket = () => {
        console.log("acitvate")
        dispatch({
            type: "ADD_BASKET",
            productToAdd: {
                id: id, 
                name: name, 
                description: description, 
                price: price, 
                stockQuantity: stockQuantity, 
                img: img,
                orderQuantity: 1
            }
        })
    };

    return (
        <div className="product">
            <img className="product_img" 
                    src={"/images/" + img}
                    alt="" 
            />
            <div className="product_info">
                <p><b>{name}</b></p>
                <p>{description}</p>
                <p className="product_price">
                    <small>$ </small>
                    <strong>{price}</strong>
                </p>
                <p className="product_stock">
                    <small>In Stock: </small>
                    <strong>{stockQuantity}</strong>
                </p>
                
            </div>
            <button onClick={addBasket}>Add to basket</button>
            
        </div>
    )
}

export default Product
