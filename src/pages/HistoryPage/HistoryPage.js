import './HistoryPage.css';
import React from 'react';

import API from '../../Services/api';
import CartAPI from '../../Services/cart_api';
import { createBrowserHistory } from 'history';

export default class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'orders': [], 'loading': true};
    }

    componentDidMount(){
        let api_key = localStorage.getItem('api_key');
        API.getOrderHistory(api_key, (result)=>{
            let orders = result.data.orders;
            this.setState({'orders': orders});
            this.setState({'loading': false});
        })
    }  

    render(){
        let header = (
            <div className="order-history-title">
                <h1>Order History</h1>
            </div>
        );

        let loading = (
            <div className="order-history-no-orders">Loading..</div>
        );
        let no_orders = (
            <div className="order-history-no-orders">You have no orders</div>
        );

        let orders = (
            <div className="order-history-container">
                {
                    this.state.orders.map(item =>{
                        return (
                            <div key={item.id} className="order-history-item">
                                <div className="order-history-item-title">
                                    <span>Order <strong>{ item.id }</strong> On <strong>{ item.created_at }</strong> For <strong>ZAR { (item.price / 100).toFixed(2) }</strong></span>
                                </div>
                                <div className="order-history-item-images">
                                    {
                                        item.images.map(image => {
                                            return <img  key={image} alt="Product" src={image}/>
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );

        return (
            <>
                { header}
                {
                    ( this.loading ? loading : (this.state.orders.length > 0 ? orders : no_orders))
                }
            </>
        );
    }
}