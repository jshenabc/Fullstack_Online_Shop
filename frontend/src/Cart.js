import React from "react";
import "./Cart.css"
// import apis from './utils/API'
import { useStateValue } from './StateProvider'
import InCartProduct from './InCartProduct'
function Cart () {
    // state = {
    //     cart: [],
    //     products: []
    // }
    const [{basket}] = useStateValue();
    
        return ( 
           <div className="cart">
               {(basket?.length === 0)?(
                   <div>
                       <h1>Your Shopping Basket is empty</h1>
                   </div>
               ):(
                   <div>
                       <h1>Your Shopping Basket</h1>
                       {basket.map(product => (
                        <InCartProduct 
                            productID={product.id}
                            name={product.name}
                            description={product.description}
                            unitPrice={product.price}
                            stockQuantity={product.stockQuantity}
                            img={product.img}
                            orderQuantity = {product.orderQuantity}
                        />
                        ))}
                   </div>
                
                
               )}
           </div>
        )
    
}

export default Cart
