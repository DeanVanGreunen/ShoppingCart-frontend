import './../Login/Login.css';
import React from 'react';
import { createBrowserHistory } from 'history';

import API from './../../Services/api';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
    }
    
    componentDidMount(){
        document.getElementById('login-form-error').style.display = "none";
    }

    attemptLogin(){
        document.getElementById('login-form-error').style.display = "none";
        let email_element = document.getElementById('login-form-input-email');
        let password_element = document.getElementById('login-form-input-password');
        let email = email_element ? email_element.value : "";
        let password = password_element ? password_element.value : "";
        API.login(email, password, (result) => {
            localStorage.setItem('api_key', result.data.api_key);
            let status = result.data.status;
            if(status !== 200){
                document.getElementById('login-form-error').innerHTML = result.data.message;
                document.getElementById('login-form-error').style.display = "block";
                return;
            } else {                
                let history = createBrowserHistory();
                history.push('/products');
                history.go();
            }
        });
    }

    gotoRegister(){
        let history = createBrowserHistory();
        history.push('/register');
        history.go();
    }

    render(){
        return (
            <div className="login-form">
                <div className="login-form-title">User Login</div>
                <div className="login-form-input">
                    <input id="login-form-input-email" placeholder="Email Address"/>
                </div>  
                <div className="login-form-input">
                    <input type="password" id="login-form-input-password" placeholder="Password"/>
                </div>  
                <div className="login-form-error" id="login-form-error">Incorrect login details</div>  
                <div className="login-form-login" onClick={this.attemptLogin}>Login</div>
                <div className="login-form-register" onClick={this.gotoRegister}>Not a member? Register here</div>
            </div>
        );
    }
}