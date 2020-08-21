import React, { Component } from "react";
import "./AdminManageCustomers.css"

import LoadingBar from '../LoadingBar'
// import { StateContext } from './StateProvider'
// import axios from 'axios'
import admin_API from '../utils/admin_API'

class AdminManageCustomers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            customerList:[],
        }
        // const [{basket}, dispatch] = useStateValue();
    }
    
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        // const [{basket}, dispatch] = this.context;
        await admin_API.admin_getAllCustomers().then(customers => {
            this.setState({
                isLoading: false,
                customerList: customers.data
            })
            console.log(customers.data);
            console.log("receive products: ", this.state);
            
        })
    }

    // static contextType = StateContext; 
    render() {
        //   const [{basket}] = this.context;
        //   console.log({basket});
        const { customerList, isLoading } = this.state;
        return isLoading ?
        (
            <LoadingBar />
        ) : ( 
            <div className="homePage">
                <div className="home_flex_row">
                { typeof(customerList) === 'undefined' ? <p>No result</p> : customerList.map(customer => {
                        return (
                            <div className="product" id={customer.id}>
                                <div className="product_info">
                                    <p><b>{customer.firstName}</b></p>
                                    <p><b>{customer.lastName}</b></p>
                                    <p>{customer.email}</p>
                                    <p>{customer.address}</p>
                                </div>
                                <button>View Customer Order</button>
                                
                            </div>
                        )
                    })
                }
                    
    
                </div>

            </div>
        );
        }
}

export default AdminManageCustomers
