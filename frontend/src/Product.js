import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'
import apis from './utils/API'

function Product({id, name, description, price, stockQuantity, img }) {

    const [{ user}, dispatch] = useStateValue();

    const handleAddBasket = async () => {
        // const { name, rating, time } = this.state
        // const arrayTime = time.split('/')
        const payload = {
            custID: user.id, 
            prodID: id,
            prodName: name, 
            prodDesc: description, 
            prodPrice: price, 
            prodIMG: img,
            prodQuan: 1
        }

        await apis.insertProductToCart(payload).then(res => {
            dispatch({
                type: "ADD_BASKET",
                productToAdd: {
                    id: id, 
                    name: name, 
                    description: description, 
                    unitPrice: price, 
                    img: img,
                    orderQuantity: 1
                }
            })
        })
    }

    // const addBasket = () => {
        
    //     dispatch({
    //         type: "ADD_BASKET",
    //         productToAdd: {
    //             id: id, 
    //             name: name, 
    //             description: description, 
    //             unitPrice: price, 
    //             img: img,
    //             orderQuantity: 1
    //         }
    //     })
    // };

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
            <button onClick={handleAddBasket}>Add to basket</button>
            
        </div>
    )
}

export default Product
