import React, { Component } from "react"
import "./Orders.css"
import apis from './utils/API'
import { StateContext } from './StateProvider'
import LoadingBar from './LoadingBar'
import { Link } from 'react-router-dom';
class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            orderList:[],
        }
        
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const [{user}] = this.context;
        await apis.getOrdersbyCustomerID(user.id).then(orders => {
            this.setState({
                isLoading: false,
                orderList: orders.data
            })
    
            console.log("receive orders: ", this.state.orderList.data);
            
        })
    }
    

    static contextType = StateContext; 
    
    render() {
        // const [{orders}] = this.context;
        // console.log("orders", orders);
        let orders =this.state.orderList.data;
        const { isLoading } = this.state;
        return isLoading ?
        (
            <LoadingBar />
        ) : (

            <div className="orders">
                {(this.state.orderList.length <= 0)?(
                    <div>
                        <h1 className="order_title">You don't have any orders yet</h1>
                    </div>
                ):(
                    <div className="orders_section">
                        <h1 className="order_title">Your Order Detail</h1>
                        {orders.map(order => (
                            <div className="InOrderProduct" id={order._id}>
                                <div>
                                    <div className="OrderInfo">
                                        <h2 className=""><strong>Order Information</strong></h2>
                                        <p className="">Order ID: <strong>{order._id}</strong></p>
                                        <p className="">Total: <strong>{order.orderTotalPrice}</strong></p>
                                        <p className="">Order Status: <strong>{order.status}</strong></p>
                                        <button><Link to={`/order/${order._id}`}>View Order Detail</Link></button>
                                    </div>
                                    
                                </div>
                                <div className="InOrderProductList">
                                {order.products.map(product => (
                                    <div className="InOrderProductListDetail">
                                        <img className="product_img" 
                                            src={"/images/" + product.img}
                                            alt="" 
                                        />
                                        <div className="cartProduct_info">
                                            <p className="cartProduct_title">{product.name}</p>
                                            <p>{product.description}</p>
                                            <p className="cartProduct_price">
                                                <small>Unit Price: $ </small>
                                                <strong>{product.unitPrice}</strong>
                                            </p>
                                   
                                            <p className="cartProduct_stock">
                                                <small>Qty: </small>
                                                <strong>{product.orderQuantity}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                        
                     
                    </div>
                    
                )}
            </div>
        )
    }
}

export default Orders



// const [{basket, orders}] = useStateValue();
// const orderID = "123";
// const index = orders.findIndex(
//     (order) => order.id === orderID
// );

// console.log(index);

// return ( 

//     <div className="OrderDetail">
//         {(index < 0)?(
//             <div>
//                 <h1 className="cart_title">Your order number is invalid</h1>
//             </div>
//         ):(
//             <div className="added_product_section">
//                 <h1 className="cart_title">Your Order Detail</h1>
//                 {/* {basket.map(product => (
//                 <InCartProduct 
//                     productID={product.id}
//                     name={product.name}
//                     description={product.description}
//                     unitPrice={product.unitPrice}
//                     img={product.img}
//                     orderQuantity = {product.orderQuantity}
//                 />
//                 ))} */}
//             </div>
            
//         )}
//     </div>
// )