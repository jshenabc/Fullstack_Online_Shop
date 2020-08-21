import React, { Component } from "react";
import "./AdminShowAllOrders.css"

import LoadingBar from '../LoadingBar'
import { Link } from 'react-router-dom';
import admin_API from '../utils/admin_API'

class AdminShowAllOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            orderList:[],
        }
        
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await admin_API.admin_getAllOrders().then(orders => {
            this.setState({
                isLoading: false,
                orderList: orders.data
            })
    
            console.log("receive orders: ", this.state.orderList.data);
            
        })
    }
    
    handleRemoveOrder = async (id) => {
        console.log(id)
        await admin_API.admin_deleteSelectedOrder(id).then(res => {
            console.log("delete success");
            window.location.reload(false);
        })
    }

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
                        <h1 className="order_title">You don't have any Active Customer Orders</h1>
                    </div>
                ):(
                    <div className="orders_section">
                        <h1 className="order_title">All Customer Orders</h1>
                        {orders.map(order => (
                            <div className="InOrderProduct" id={order._id}>
                                <div>
                                    <div className="custInfo">
                                        <h2 className=""><strong>Customer Information</strong></h2>
                                        <p className="">First Name: {order.customer.firstName}</p>
                                        <p className="">Last Name: {order.customer.lastName}</p>
                                        <p className="">Email: {order.customer.email}</p>
                                        <p className="">Address: {order.customer.address}</p>
                                    </div>
                                    <div className="OrderInfo">
                                        <h2 className=""><strong>Order Information</strong></h2>
                                        <p className="">Order ID: <strong>{order._id}</strong></p>
                                        <p className="">Total: <strong>{order.orderTotalPrice}</strong></p>
                                        <p className="">Order Status: <strong>{order.status}</strong></p>
                                        {/* <button><Link to={`/order/${order._id}`}>Update Order</Link></button> */}
                                        <button onClick={() => this.handleRemoveOrder(order._id)}>Delete Order</button>
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

export default AdminShowAllOrders
