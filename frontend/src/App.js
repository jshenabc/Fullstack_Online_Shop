import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './Header'
import Homepage from './Homepage';
import Cart from './Cart';
import Orders from './Orders';
import OrderDetail from './OrderDetail';

//admin component import
import AdminHeader from './admin_interface/AdminHeader';
import AdminManageCustomers from './admin_interface/AdminManageCustomers';
import AdminShowActiveOrder from './admin_interface/AdminShowActiveOrder';
import AdminShowAllOrders from './admin_interface/AdminShowAllOrders';
function App() {

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/order/:id' component={OrderDetail} />
          <Route path="/cart">
            <Header />
            <Cart />
          </Route>
          <Route path="/admin/managercustomers">
            <AdminHeader />
            <AdminManageCustomers />
          </Route>
          <Route path="/admin/allOrders">
            <AdminHeader />
            <AdminShowAllOrders />
          </Route>
          <Route path="/myorders">
            <Header />
            <Orders />
          </Route>
          <Route path="/admin">
            <AdminHeader />
            <AdminShowActiveOrder />
          </Route>
          <Route path="/">
            <Header />
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
