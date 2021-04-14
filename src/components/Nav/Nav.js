import 'bootstrap/dist/css/bootstrap.min.css';
import '../Nav/Nav.css';
import React from 'react';
import { withRouter } from 'react-router-dom'

import { createBrowserHistory } from 'history';

import icon_product from './../../icons/icons8_box_26px.png';
import icon_male from './../../icons/icons8_male_user_512px.png';
import icon_cart from './../../icons/icons8_shopping_cart_480px.png';


import API from '../../Services/api';
import CartAPI from '../../Services/cart_api';

class Nav extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            cart_items: []
        };
        this.logout = this.logout.bind(this);
        this.openCart = this.openCart.bind(this);
        this.closeCart = this.closeCart.bind(this);
        this.openProfile = this.openProfile.bind(this);
        this.closeProfile = this.closeProfile.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
        this.gotoProducts = this.gotoProducts.bind(this);
        this.gotoCart = this.gotoCart.bind(this);
        this.getCartTotalSum = this.getCartTotalSum.bind(this); 
        this.clearCart = this.clearCart.bind(this);      
    }

    componentDidMount(){
        let api_key = localStorage.getItem('api_key');
        API.isLoggedIn(api_key, (result) => {
        this.setState({'isLoggedIn': result.data.is_logged_in});
        });
        let product_id_and_quantity_array = CartAPI.getProducts();
        API.getProductFromIDandQuantityArray(product_id_and_quantity_array, (result)=>{
        this.setState({'cart_items': result.data.products});
        })
    }

    logout(){
        this.setState({ 'isLoggedIn': false});
        localStorage.setItem('api_key', null);
    }

    openCart(){
    // BUG FIX: Fetch latest cart product list (can't update Nav from child via Any Pages)
    let product_id_and_quantity_array = CartAPI.getProducts();
    API.getProductFromIDandQuantityArray(product_id_and_quantity_array, (result)=>{
        this.setState({'cart_items': result.data.products});
        var x = document.getElementById("my-cart");
    x.style.display = "block";
    })       
    }

    closeCart(){
    var x = document.getElementById("my-cart");
    x.style.display = "none";
    }

    openProfile(){
    var x = document.getElementById("my-profile-container");
    x.style.display = "block";
    }

    closeProfile(){
        var x = document.getElementById("my-profile-container");
        x.style.display = "none";
    }

    gotoLogin(){
        let history = createBrowserHistory();
        history.push('/login');
        history.go();
    }
    
    gotoOrderHistory(){
        let history = createBrowserHistory();
        history.push('/history');
        history.go();
    }

    gotoProducts(){
        let history = createBrowserHistory();
        history.push('/products');
        history.go();
    }

    gotoCart(){
        let history = createBrowserHistory();
        history.push('/cart');
        history.go();
    }

    getCartTotalSum(){
        let sum = 0;
        this.state.cart_items.forEach(function(entry) {
        sum += ((entry.price * entry.quantity ) / 100); // item price stored as (value * 100) 
        });
        return sum;
    }

    clearCart(){
        CartAPI.clearProducts();
        this.setState({'cart_items': []});
    }
    render(){
        // Nav Header (Displays correct menus if user is logged out or logged in) 
        let navLoggedOutOrIn = (!this.state.isLoggedIn) ? 
        (
            <div className="navigational-bar">
                <div className="navigational-bar-logo">Shopping Kart&nbsp;&trade;</div>
                <div className="navigational-bar-menu">
                    <a href="#" onClick={this.gotoProducts}><img src={icon_product} />&nbsp;&nbsp;View Products</a>
                    <a href="#" onClick={this.openCart}><img src={icon_cart} />&nbsp;Cart</a>
                    <a href="#" onClick={this.gotoLogin}><img src={icon_male} />&nbsp;Login/Register</a>
                </div>  
            </div>
        ):(
            <div className="navigational-bar">
                <div className="navigational-bar-logo">Shopping Kart&nbsp;&trade;</div>
                <div className="navigational-bar-menu">
                    <a href="#" onClick={this.gotoProducts}><img alt="Icon" src={icon_product} />&nbsp;&nbsp;View Products</a>
                    <a href="#" onClick={this.openCart}><img alt="Icon" src={icon_cart} />&nbsp;Cart</a>
                    <a href="#" onClick={this.openProfile}><img alt="Icon" src={icon_male} />&nbsp;My Profile</a>
                </div>
            </div>
        );

        // Profile Dropdown Menu
        let profileButtonDropdown = (
            <div className="my-profile-container" id="my-profile-container" onMouseLeave={this.closeProfile}>
                <a href="#" onClick={this.gotoOrderHistory}>Order History</a>
                <a href="#" onClick={this.logout}>Logout</a>
            </div>
        );
        
        // Shopping Cart
        let cartButtonDropdown = (
            <div className="my-cart" id="my-cart" onMouseLeave={this.closeCart}>
                <h1>My Cart</h1>
                <table className="my-cart-items">
                    <tbody>
                    { 
                        // Cart has entries, use map to display products
                        this.state.cart_items.map(item =>
                        (
                            <tr key={item.id}>
                                <td>
                                    <div className="my-cart-item-quantity">
                                        <div className="my-cart-item-quantity-value">{ item.quantity }</div>
                                        <div className="my-cart-item-quantity-title">quantity</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="my-cart-item-name">{ item.name.slice(0, 22) }</div>
                                </td>
                                <td>
                                    <div className="my-cart-item-price">
                                        <div className="my-cart-item-price-value">R&nbsp;{ (item.price / 100).toFixed(2) }</div>
                                        <div className="my-cart-item-price-title">Price per item</div>
                                    </div>
                                </td>
                            </tr>
                        )
                    )
                    }
                    </tbody>
                </table>
                {   // Empty Cart Text
                    this.state.cart_items.length === 0 ? <span className="cart-empty-span">Your cart is empty</span> : ''
                }
                <table className="totalPrice">
                    <tbody>
                        <tr>
                            <td className="boldTotal">Total:</td>
                            <td className="rightAlignedPrice">R{ this.getCartTotalSum().toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
                <div className="payButton" onClick={!this.state.isLoggedIn ? this.gotoLogin : this.gotoCart }>{ !this.state.isLoggedIn ? "Login To Pay" : "Pay Now"}</div>
                {
                     this.state.cart_items.length !== 0 ? (<button className="clearCartButton" onClick={this.clearCart}>Empty Cart</button>) : ( null )
                }
            </div>
        );
        return (
            <>
                { navLoggedOutOrIn }
                { profileButtonDropdown }
                { cartButtonDropdown }
            </>
        );
    }
}

export default withRouter(Nav)