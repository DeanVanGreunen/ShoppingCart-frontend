
import './App.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Nav Menu
import Nav from './components/Nav/Nav';

// Pages
// - Products (Displays all products)
// - Login Page (Used to login user)
// - Register Page (Used to register user)
// - Product Details Page (Used to display product details and allow user to add the product to their cart)
// - Cart Page (Used to confirm current checkout cart and procced with payment process)
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import ThankYou from './pages/ThankYou/ThankYou';
import HistoryPage from './pages/HistoryPage/HistoryPage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <Router>
        <Switch>
        <Route path="/product/:id" render={ (props) => {
          return (
            <>
              <Nav></Nav>
              <ProductDetails productID={props.match.params.id}></ProductDetails>
            </>
          )
        }}>  
        </Route>
        <Route path="/login">
          <div className="full-page">
            <Nav></Nav>
            <Login></Login>
          </div>
        </Route>
        <Route path="/register">
          <div className="full-page">
            <Nav></Nav>
            <Register></Register>
          </div>
        </Route>
        <Route path="/cart">
          <div className="full-page">
            <Nav></Nav>
            <Cart></Cart>
          </div>
        </Route>
        <Route path="/thankyou">
          <div className="full-page">
            <Nav></Nav>
            <ThankYou></ThankYou>
          </div>
        </Route>
        <Route path="/history">
          <div className="full-page">
            <Nav></Nav>
            <HistoryPage></HistoryPage>
          </div>
        </Route>
        <Route path={['/', '/products']}>
          <div className="full-page">
            <Nav></Nav>
            <Products></Products>
          </div>
        </Route>
      </Switch>
    </Router>
    );
  }
}