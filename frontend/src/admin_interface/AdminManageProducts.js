import React, { Component } from "react";
import "./AdminManageProducts.css"

import LoadingBar from '../LoadingBar'

import apis from '../utils/API'
import admin_API from '../utils/admin_API'
class AdminManageProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            productList:[],
        }
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await apis.getAllProducts().then(products => {
            this.setState({
                isLoading: false,
                productList: products.data
            })
            console.log(products.data);
            console.log("receive products: ", this.state);
            
        })
    }

    handleRemoveProduct = async (id) => {
        this.setState({ isLoading: true })
        await admin_API.admin_deleteSelectedProduct(id).then(res => {
            console.log("delete success");
            this.setState({
                isLoading: false,
            })
            window.location.reload(false);
        })
    }

    // static contextType = StateContext; 
    render() {
        //   const [{basket}] = this.context;
        //   console.log({basket});
        const { productList, isLoading } = this.state;
        return isLoading ?
        (
            <LoadingBar />
        ) : ( 
            <div className="homePage">
                <div className="home_flex_row">
                { typeof(productList) === 'undefined' ? <p>No result</p> : productList.map(product => {
                        return (
                            <div className="product">
                                <img className="product_img" 
                                        src={"/images/" + product.img}
                                        alt="" 
                                />
                                <div className="product_info">
                                    <p><b>{product.name}</b></p>
                                    <p>{product.description}</p>
                                    <p className="product_price">
                                        <small>$ </small>
                                        <strong>{product.price}</strong>
                                    </p>
                                    <p className="product_stock">
                                        <small>In Stock: </small>
                                        <strong>{product.stockQuantity}</strong>
                                    </p>
                                    
                                </div>
                                <button onClick={() => this.handleRemoveProduct(product._id)}>Delete Product</button>
                                
                            </div>
                        )
                    })
                }
                    
    
                </div>

            </div>
        );
        }
}

export default AdminManageProducts
