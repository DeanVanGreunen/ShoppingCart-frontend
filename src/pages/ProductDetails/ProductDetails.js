import './../ProductDetails/ProductDetails.css';
import React from 'react';

  import API from './../../Services/api';
  import CartAPI from '../../Services/cart_api';

export default class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };

        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount(){
        let PID = this.props.productID;
        API.getProduct(PID, (result) => {
            this.setState({
                product: result.data.product
            });
    
        });
    }

    addToCart(){
        let add_to_cart_element = document.getElementById('AddToCartBTN');
        add_to_cart_element.innerHTML = "Added To Cart";
        add_to_cart_element.style.background = '#F5F5F5';
        add_to_cart_element.style.color = '#202020';
        add_to_cart_element.disabled = true;
        let product_id = this.state.product.id;
        let quantity_element = document.getElementById('product-quantity');
        let quantity_value = quantity_element.value ? quantity_element.value : 1; // Defaults to 1 if no input is entered (also a bug fix)
        CartAPI.addToCart(product_id, quantity_value);
        setTimeout(()=>{            
            let add_to_cart_element = document.getElementById('AddToCartBTN');
            add_to_cart_element.innerHTML = "Add To Cart";
            add_to_cart_element.style.background = '#202020';
            add_to_cart_element.style.color = '#F5F5F5';
            add_to_cart_element.disabled = false;
            
            let quantity_element = document.getElementById('product-quantity');
            quantity_element.value = 1;
        }, 2000);
    }

    onKeyPressLimitToNumbersOnly(event){
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValid = new RegExp("[0-9]").test(keyValue);
        if (!isValid) {
           event.preventDefault();
           return;
        }
    }

    render(){
        if(this.state.product){
            return (
                <div className="product-details-contianer">
                    <div className="product-details-left">
                        <div className="product-details-title">Product Details</div>
                        <div className="product-details-image-container">
                            <img alt="Product" src={ this.state.product.image }/>
                        </div>
                        <div className="product-details-description-title">Description</div>
                        <div className="product-details-description-text">{ this.state.product.description }</div> 
                    </div>
                    <div className="product-details-right">
                        <div className="product-details-name">{ this.state.product.name }</div>
                        <div className="product-details-price">ZAR { (this.state.product.price / 100).toFixed(2) }</div>
                        <div className="product-details-cart-container">
                            <div className="product-details-cart-quantity-container">
                                <div className="product-details-cart-quantity-container-input-contianer">
                                    <input id="product-quantity" placeholder="1" onKeyPress={this.onKeyPressLimitToNumbersOnly}/>
                                </div> 
                                <div className="product-details-cart-title">Quantity</div> 
                            </div> 
                            <button className="product-details-cart-add-button" id="AddToCartBTN" onClick={this.addToCart}>Add To Cart</button> 
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>Loading Product Data</div>
            )
        }
    }
}