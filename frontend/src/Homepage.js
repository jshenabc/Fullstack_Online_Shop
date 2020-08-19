import React, { Component } from "react";
import "./Homepage.css"
import Product from './Product'
import LoadingBar from './LoadingBar'
// import { StateContext } from './StateProvider'
// import axios from 'axios'
import apis from './utils/API'

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            productList:[],
        }
        // const [{basket}, dispatch] = useStateValue();
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        // const [{basket}, dispatch] = this.context;
        await apis.getAllProducts().then(products => {
            this.setState({
                isLoading: false,
                productList: products.data
            })
            console.log(products.data);
            console.log("receive products: ", this.state);
            
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
                <img
                        className="home_ad_img" 
                        src="/images/SlideAdsShopping.png"
                        alt=""
                /> 
                <div className="home_flex_row">
                { typeof(productList) === 'undefined' ? <p>No result</p> : productList.map(product => {
                        return <Product 
                        id={product.id}
                        name = {product.name}
                        description = {product.description}
                        price = {product.price}
                        stockQuantity = {product.stockQuantity}
                        img = {product.img}
                        />
                    })
                }
                    
    
                </div>

            </div>
        );
        }
}

export default Homepage
