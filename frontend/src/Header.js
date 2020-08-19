import React, { Component } from "react"
import "./Header.css"
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { StateContext } from './StateProvider'
import { getBasketCount } from './reducer'
import apis from './utils/API'
class Header extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     loggedInUserID: "5f35afeaea4b72f505885952",
        // }
        
    }
  

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
            console.log("products in basket", {basket});
            // console.log("receive products: ", this.state);
            dispatch({
                type: "RECEIVE_BASKET",
                receiveBasket: {
                    data: cart.data.data.products,
                }
            })
            
        })
    }
    static contextType = StateContext; 

    render() {

        const [{basket}] = this.context;

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
                    <input type="text" className="header_searchInput" />
                    <SearchIcon className="header_searchIcon" />
                </div>
                <div className="header_nav">
                    <Link to ="/login" className="header_link">
                        <div className="header_opt">  
                            <span>Sign In</span>
                        </div>
                    </Link>
                    <Link to ="/login" className="header_link">
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
