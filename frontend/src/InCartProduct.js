import React from "react";
import "./InCartProduct.css"
// import apis from './utils/API'
import { useStateValue } from './StateProvider'
import apis from './utils/API'

function InCartProduct ({productID, name, description, unitPrice, img, orderQuantity }) {

    const [{basket, user}, dispatch] = useStateValue();

    const handleRemoveBasket = async () => {
        console.log("basket",{basket});
        console.log(user.id, productID)
        await apis.deleteProductById(user.id, productID).then(res => {
            dispatch({
                type:"REMOVE_BASKET",
                id:productID,
            })
        })
    }

    
    return ( 
        <div className="InCartProduct" id={productID}>
            <img className="product_img" 
                src={"/images/" + img}
                alt="" 
            />
            <div className="cartProduct_info">
                <p className="cartProduct_title">{name}</p>
                <p>{description}</p>
                <p className="cartProduct_price">
                    <small>Unit Price: $ </small>
                    <strong>{unitPrice}</strong>
                </p>
                {/* <p className="cartProduct_stock">
                    <small>In Stock: </small>
                    <strong>{stockQuantity}</strong>
                </p> */}
                <p className="cartProduct_stock">
                    <small>Qty: </small>
                    <strong>{orderQuantity}</strong>
                </p>
                <button onClick={handleRemoveBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default InCartProduct
