import React, { Component } from "react"
// import "./Orders.css"
import apis from './utils/API'
import LoadingBar from './LoadingBar'
import Header from './Header'

class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            order:{
                customer: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    address: ""
                },
                _id: "",
                customerID: "",
                products: [
                    {
                        _id: "",
                        id: "",
                        name: "",
                        description: "",
                        unitPrice: 0,
                        img: "mac16.jpg",
                        orderQuantity: 0
                    }
                ],
                status: "active",
                orderTotalPrice: 0
            },
        }
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { id } = this.props.match.params;
        // const [{basket}, dispatch] = this.context;
        await apis.getOrderbyID(id).then(products => {
            this.setState({
                isLoading: false,
                order: products.data.data
            })
            console.log(products.data);
            console.log("receive order: ", this.state);
            
        })
    }

    // static contextType = StateContext; 
    render() {
        //   const [{basket}] = this.context;
        //   console.log({basket});
        const { order, isLoading } = this.state;

        return (isLoading ?
        (
            <LoadingBar />
        ) : ( 
            <div>
                <Header />
                <h1 className="order_title">Your Order Detail</h1>
  

                { typeof(order) === 'undefined' ? <p>No result</p> : (
                        <div className="InOrderProduct" >
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
                    )
                }

            </div>
        ));
    }
}


export default OrderDetail

