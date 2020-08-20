import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './Header'
import Homepage from './Homepage';
import Cart from './Cart';
import Orders from './Orders';

function App() {

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/cart">
            <Header />
            <Cart />
          </Route>
          <Route path="/myorders">
            <Header />
            <Orders />
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
