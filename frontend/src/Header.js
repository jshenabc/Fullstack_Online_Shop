import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

function Header() {
    return (
        <nav className="header">
            <Link to="/">
                <img
                    className="header_logo" 
                    src="https://www.graphicsprings.com/filestorage/stencils/337eff932d1fbaa3e32c6f327edf84a2.png?width=500&height=500"
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
                        <span class="header_opt_basket_count">0</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header
