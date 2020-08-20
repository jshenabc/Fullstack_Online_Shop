import React from "react";
import "./CheckoutSection.css"
import { useStateValue } from './StateProvider'
import { getBasketCount } from './reducer'
import { getCheckoutSubtotal } from './reducer'
import apis from './utils/API'
import { Redirect } from "react-router-dom";

function CheckoutSection () {
    const [{basket, user}, dispatch] = useStateValue();

    const handleSubmitOrder = async () => {
        let totalPrice = getCheckoutSubtotal(basket);
        const payload = {
            customerID: user.id,
            customer:
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address,
                }
            ,
            products: basket,
            status: "active",
            orderTotalPrice: totalPrice
        }

        await apis.createOrder(payload).then(res => {
            console.log("order number:", res.data.id);
            dispatch({
                type: "SUBMIT_ORDER",
                orderDetail: payload
            })
    
            window.location.replace("http://localhost:8000/myorders");
        })
    }
        return ( 
            <div className="checkout_section">
                <h2>Order Subtotal</h2>
                <p><strong>({getBasketCount(basket)}</strong> items):</p>
                <p className="total_price"><strong>$ {getCheckoutSubtotal(basket)}</strong></p>
                <button onClick={handleSubmitOrder}><p><strong>Submit Order</strong></p></button>
            </div>
        )
    
}

export default CheckoutSection
