import './Cart.css';
import React from 'react';

import API from '../../Services/api';
import CartAPI from '../../Services/cart_api';
import { createBrowserHistory } from 'history';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'products': []};
        this.removeFromCart = this.removeFromCart.bind(this);
        this.payNow = this.payNow.bind(this);
    }
    
    componentDidMount(){
        let product_id_and_quantity_array = CartAPI.getProducts();
        API.getProductFromIDandQuantityArray(product_id_and_quantity_array, (result)=>{
            this.setState({'products': result.data.products});
        });
    }
    
    removeFromCart(event){
        const product_id = event.currentTarget.getAttribute("data-id");
        CartAPI.deleteProductFromCart(product_id);
        let product_id_and_quantity_array = CartAPI.getProducts();
        API.getProductFromIDandQuantityArray(product_id_and_quantity_array, (result)=>{
            this.setState({'products': result.data.products});
        });
    }

    getCartTotalSum(){
        let sum = 0;
        this.state.products.forEach(function(entry) {
        sum += ((entry.price * entry.quantity ) / 100); // item price stored as (value * 100) 
        });
        return sum;
    }

    payNow(){
        let cart_page_pay_button_element = document.getElementById('cart-page-pay-button');
        cart_page_pay_button_element.disabled = true;
        cart_page_pay_button_element.innerHTML = "Loading Please Wait";
        let data = CartAPI.getProducts();
        let api_key = localStorage.getItem('api_key');
        console.log(api_key);
        API.createOrders(api_key, data, (result)=>{
            if(result.data.success === 200){
                CartAPI.clearProducts();
                let history = createBrowserHistory();
                history.push('/thankyou');
                history.go();
            } else {
                alert('An unknown error has occured')
            }
        });
    }

    render(){
        let header = (
            <div className="cart-page-title">
                <h1>My Shopping Cart</h1>
            </div>
        );
        let no_products = (<div className="cart-page-no-products">You do not have any products in your shopping cart</div>);
        let products_container = (
            <>
                <div className="cart-page-product-container">
                {
                    this.state.products.map(item => {
                            return (
                                <div className="cart-page-product-item" key={item.id}>
                                    <div className="cart-page-product-item-quantity">
                                        <div className="cart-page-product-item-quantity-value">{ item.quantity }</div>
                                        <div className="cart-page-product-item-quantity-sub-text">Quantity</div>
                                    </div>
                                    <div className="cart-page-product-item-name">{ item.name.slice(0, 32) }</div>
                                    <div className="cart-page-product-item-price">                            
                                        <div className="cart-page-product-item-price-title">R{ (item.price / 100).toFixed(2) }</div>
                                        <div className="cart-page-product-item-price-sub-text">Total price</div>
                                    </div>
                                    <button className="cart-page-product-item-remove-button" onClick={this.removeFromCart} data-id={item.id}>
                                        <div className="cart-page-product-item-remove-button-title">X</div>
                                        <div className="cart-page-product-item-remove-button-sub-text">Remove</div>
                                    </button>
                                </div>
                            )
                    })
                }
                </div>
                <div className="cart-page-total">
                    <div className="cart-page-total-value">Total&nbsp;&nbsp;&nbsp;R{ this.getCartTotalSum().toFixed(2) }</div>                    
                </div>
                <button className="cart-page-pay-button" id="cart-page-pay-button" onClick={this.payNow}>Pay Now</button>
            </>
        );
        return (
            <>
                { header }
                {
                    (this.state.products.length === 0)? (
                        no_products
                    ) : (
                        products_container
                    )
                }
            </>
        );
    }
}