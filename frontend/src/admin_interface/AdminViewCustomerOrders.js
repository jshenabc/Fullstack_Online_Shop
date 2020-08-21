import React, { Component } from "react"
import "../Orders.css"
import apis from '../utils/API'
import LoadingBar from '../LoadingBar'
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
class AdminViewCustomerOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            orderList:[],
        }
        
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { id } = this.props.match.params;
        await apis.getOrdersbyCustomerID(id).then(orders => {
            this.setState({
                isLoading: false,
                orderList: orders.data
            })
    
            console.log("receive orders: ", this.state.orderList.data);
            
        })
    }
    

  
    
    render() {
        // const [{orders}] = this.context;
        // console.log("orders", orders);
        let orders =this.state.orderList.data;
        const { isLoading, orderList } = this.state;
        return isLoading ?
        (
            <LoadingBar />
        ) : (
            <div>
                <AdminHeader />
                <div className="orders">
                {    console.log(typeof(orderList.data) === 'undefined')}
                {    console.log(typeof(orderList.data) === 'undefined'|| orderList.data.length === 0  )}
                    {(typeof(orderList.data) === 'undefined'|| orderList.data.length === 0 )?(
                        <div>
                            <h1 className="order_title">This customer doesn't have any orders yet</h1>
                        </div>
                    ):(
                        <div className="orders_section">
                            <h1 className="order_title">All Orders for Selected Customer below</h1>
                            <div className="custInfo">
                                        <p className="">First Name: {orders[0].customer.firstName}</p>
                                        <p className="">Last Name: {orders[0].customer.lastName}</p>
                                        <p className="">Email: {orders[0].customer.email}</p>
                                        <p className="">Address: {orders[0].customer.address}</p>
                            </div>
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
            </div>  
        )
    }
}

export default AdminViewCustomerOrders

