import React from "react";
import "./Cart.css"
// import apis from './utils/API'
import { useStateValue } from './StateProvider'
import InCartProduct from './InCartProduct'
import CheckoutSection from "./CheckoutSection";

function Cart () {

    const [{basket}] = useStateValue();
    
    
        return ( 
           <div className="cart">
               {(basket?.length === 0)?(
                   <div>
                       <h1 className="cart_title">Your Shopping Basket is empty</h1>
                   </div>
               ):(
                   <div className="added_product_section">
                       <h1 className="cart_title">Your Shopping Basket</h1>
                       {basket.map(product => (
                        <InCartProduct 
                            productID={product.id}
                            name={product.name}
                            description={product.description}
                            unitPrice={product.unitPrice}
                            img={product.img}
                            orderQuantity = {product.orderQuantity}
                        />
                        ))}
                   </div>
                    
               )}
               {basket.reduce((sum,value) => {
                            return (sum + value.orderQuantity)
                        }, 0)> 0 && (
                            <div className="checkoutSection">
                                <CheckoutSection />
                            </div>
                        )
                }
           </div>
        )
    
}

export default Cart
