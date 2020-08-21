import React, { Component } from "react"
import "./Orders.css"
import apis from './utils/API'
import LoadingBar from './LoadingBar'
import Product from './Product'
import { Link } from 'react-router-dom';
import Header from './Header'
class SearchProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            productList:[],
        }
        
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const { productName } = this.props.match.params;
        await apis.getProductBySearch(productName).then(products => {
            this.setState({
                isLoading: false,
                productList: products.data
            })
    
            console.log("receive orders: ", this.state.productList.data);
            
        })
    }
    

    
    render() {
        // const [{orders}] = this.context;
        // console.log("orders", orders);
        
        const { isLoading, productList } = this.state;
        let products =this.state.productList.data;
        return isLoading ?
        (
            <LoadingBar />
        ) : (
            <div>
                <Header />
            <div className="orders">
                {(typeof(productList.data) === 'undefined'|| productList.data.length === 0)?(
                    <div>
                        <h1 className="order_title">You don't have any orders yet</h1>
                    </div>
                ):(
                    <div className="home_flex_row">
                     
                        {products.map(product => {
                        return <Product key={product.key}
                        id={product.id}
                        name = {product.name}
                        description = {product.description}
                        price = {product.price}
                        stockQuantity = {product.stockQuantity}
                        img = {product.img}
                        />
                    })}
                        
                     
                    </div>
                    
                )}
            </div>
            </div>
        )
    }
}

export default SearchProducts

