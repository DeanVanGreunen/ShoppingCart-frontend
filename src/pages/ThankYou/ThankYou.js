import './ThankYou.css';
import React from 'react';
import { createBrowserHistory } from 'history';
import API from '../../Services/api';
import CartAPI from '../../Services/cart_api';

export default class ThankYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'isLoggedIn': false};
        this.gotoOrderHistory = this.gotoOrderHistory.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    componentDidMount(){
        let api_key = localStorage.getItem('api_key');
        API.isLoggedIn(api_key, (result) => {
            this.setState({'isLoggedIn': result.data.is_logged_in});
        });
    }
    gotoOrderHistory(){
        let history = createBrowserHistory();
        history.push('/history');
        history.go();
    }
    gotoLogin(){
        let history = createBrowserHistory();
        history.push('/login');
        history.go();
    }

    render(){
        let loggedIn = (
            <div className="thank-you-message-container">
                <div className="thank-you-message">Thank you for your purchase</div>
                <div className="go-to-order-history" onClick={this.gotoOrderHistory}>View Order History</div>
            </div>
        );

        let loggedOut = (
            <div className="thank-you-message-container">
                <div className="thank-you-message">Thank you for your purchase</div>
                <div className="go-to-order-history" onClick={this.gotoLogin}>Login To View Order History</div>
            </div>
        );
        return ((this.state.isLoggedIn)? loggedIn : loggedOut);
    }
}