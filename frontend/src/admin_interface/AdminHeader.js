import React, { Component } from "react"
import "./AdminHeader.css"
import { Link } from 'react-router-dom'

class AdminHeader extends Component {




    render() {

        return (
            <nav className="header">
                <Link to="/">
                    <img
                        className="header_logo" 
                        src="/images/logo.png"
                        alt=""
                    /> 
                </Link>

                <div className="header_nav">
                    <Link to ="/admin" className="header_link">
                        <div className="header_opt">  
                        <span>Welcome! Admin</span>
                  
                        </div>
                    </Link>
                    <Link to ="/admin/managercustomers" className="header_link">
                        <div className="header_opt">     
                            <span>Manage Customers</span>
                        </div>
                    </Link>
                    <Link to ="/admin/allOrders" className="header_link">
                        <div className="header_opt">     
                            <span>Manage Orders</span>
                        </div>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default AdminHeader
