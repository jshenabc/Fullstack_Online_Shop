import React, { Component } from "react";
import "./Homepage.css"
import Product from './Product'
// import apis from './utils/API'
import { useStateValue } from './StateProvider'

function Homepage () {
    // state = {
    //     cart: [],
    //     products: []
    // }
    const [{basket}, dispatch] = useStateValue();
    
        return ( 
            <div className="homePage">
                <img
                        className="home_ad_img" 
                        src="/images/SlideAdsShopping.png"
                        alt=""
                /> 
                <div className="home_flex_row">
                    <Product 
                    id="1"
                    name = "product1"
                    description = "product desc"
                    price = {11}
                    stockQuantity = {10}
                    img = "ipadPro.jpg"
                    />
                    <Product 
                    id="1"
                    name = "product1"
                    description = "product desc"
                    price = {11}
                    stockQuantity = {10}
                    img = "ipadPro.jpg"
                    />
                    <Product 
                    id="1"
                    name = "product1"
                    description = "product desc"
                    price = {11}
                    stockQuantity = {10}
                    img = "ipadPro.jpg"
                    />
                </div>

            </div>
        )
    
}

export default Homepage
