import './../Products/Products.css';
import React from 'react';
import Product from '../../components/Product/Product';

import API from './../../Services/api';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount(){
        API.listProducts((result =>{
            this.setState({
                products: result.data.products
            });    
        }));
    }
    render(){
        if(this.state.products.length >= 1){
            return (
                <div className="product-container-container">
                    <div className="product-container-title">
                        <h1>Products</h1>
                    </div>
                    <div className="product-list-container">
                        { this.state.products.map(product => <Product key={product.id} data={product}></Product>)}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="product-container-container">
                    <div className="product-container-title">
                        <h1>Products</h1>
                    </div>
                    <div className="product-list-container">Loading Products</div>
                </div>
            );
        }
    }
}