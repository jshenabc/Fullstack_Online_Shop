import React from "react";
import "./CheckoutSection.css"
import { useStateValue } from './StateProvider'
import { getBasketCount } from './reducer'
import { getCheckoutSubtotal } from './reducer'

function CheckoutSection () {
    const [{basket}] = useStateValue();
        return ( 
            <div className="checkout_section">
                <h2>Order Subtotal</h2>
                <p><strong>({getBasketCount(basket)}</strong> items):</p>
                <p className="total_price"><strong>$ {getCheckoutSubtotal(basket)}</strong></p>
                <button><p><strong>Submit Order</strong></p></button>
            </div>
        )
    
}

export default CheckoutSection
