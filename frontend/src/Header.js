import React, { Component } from "react"
import "./Header.css"
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { StateContext } from './StateProvider'
import { getBasketCount } from './reducer'
import apis from './utils/API'
class Header extends Component {


    componentDidMount = async () => {
        // this.setState({ isLoading: true })
        const [{basket, user}, dispatch] = this.context;
        // this.state.loggedInUserID
        await apis.getCartByCustomerId(user.id).then(cart => {
            // this.setState({
            //     isLoading: false,
            //     productList: products.data
            // })
            console.log("products in cart", cart.data.data.products);
            let receivedData = cart.data.data.products.map(product => {
                return {
                    description: product.description,
                    img: product.img,
                    name: product.name,
                    orderQuantity: product.orderQuantity,
                    unitPrice: product.unitPrice,
                    id: product.id,
                }
            })
           
            // console.log("receive products: ", this.state);
            dispatch({
                type: "RECEIVE_BASKET",
                receiveBasket: {
                    data: receivedData,
                }
            })
            console.log("products in basket", {basket});
        })
    }
    static contextType = StateContext; 

    handleSearch =  () => {
        let inputVal = document.getElementById("searchInput").value;
        inputVal = inputVal.replace(/\s/g , "-");
      
        let redirectURL = "http://localhost:8000/products/" + inputVal;
        console.log(redirectURL);
        window.location.replace(redirectURL);
    }

    render() {

        const [{basket, user}] = this.context;

        return (
            <nav className="header">
                <Link to="/">
                    <img
                        className="header_logo" 
                        src="/images/logo.png"
                        alt=""
                    /> 
                </Link>
                {/* {Search box} */}
                <div className="header_search">
                    <input type="text" className="header_searchInput" id="searchInput" />
                    <SearchIcon className="header_searchIcon" onClick={() => this.handleSearch()}/>
                    
                </div>
                <div className="header_nav">
                    <Link to ="/login" className="header_link">
                        <div className="header_opt">  
                        <span>Welcome! {user.firstName}</span>
                  
                        </div>
                    </Link>
                    <Link to ="/myorders" className="header_link">
                        <div className="header_opt">     
                            <span>Orders</span>
                        </div>
                    </Link>
                    <Link to ="/cart" className="header_link">
                        <div className="header_opt_basket"> 
                            <ShoppingBasketIcon />    
                            <span className="header_opt_basket_count">
                            {/* {basket?.length} */}
                            {getBasketCount(basket)}
                            </span>
                        </div>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Header
