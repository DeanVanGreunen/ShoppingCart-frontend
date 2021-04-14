import './Register.css';
import React from 'react';
import { createBrowserHistory } from 'history';
import API from '../../Services/api';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        document.getElementById('register-form-error').style.display = "none";
    }

    attemptRegistration(){
        // Clear Error
        let error_element = document.getElementById('register-form-error');
        error_element.innerHTML = "e";  
        error_element.style.display = "none";

        let fullname_element = document.getElementById('register-form-input-fullname');
        let email_element = document.getElementById('register-form-input-email');
        let password_element = document.getElementById('register-form-input-password');
        let confirm_password_element = document.getElementById('register-form-input-password-confirm');

        
        let fullname = fullname_element ? fullname_element.value : "";
        let email = email_element ? email_element.value : "";
        let password = password_element ? password_element.value : "";
        let confirm_password = confirm_password_element ? confirm_password_element.value : "";

        // Validate
        if(fullname === "" || !fullname){
            error_element.innerHTML = "Invalid Full Name";  
            document.getElementById('register-form-error').style.display = "block";      
            return;
        }
        if(email === "" || !email || email.indexOf('@') === -1 || email.indexOf('.') === -1){
            error_element.innerHTML = "Invalid Email Provide";        
            document.getElementById('register-form-error').style.display = "block";
            return;
        }
        if(!password_element || !confirm_password){
            error_element.innerHTML = "Invalid Password Provided";        
            document.getElementById('register-form-error').style.display = "block";
            return;
        }
        if(password !== confirm_password){
            error_element.innerHTML = "Your passwords do not match";        
            document.getElementById('register-form-error').style.display = "block";
            return;    
        }

        API.register(fullname, email, password, (result) => {
            if(result.data.status === 200){
                let history = createBrowserHistory();
                history.push('/products');
                history.go();
            } else {
                error_element.innerHTML = result.data.message;        
                document.getElementById('register-form-error').style.display = "block";
            }
        });
    }

    gotoLogin(){
        let history = createBrowserHistory();
        history.push('/login');
        history.go();
    }

    render(){
        return (
            <div className="register-form">
                <div className="register-form-title">User Register</div>
                <div className="register-form-input">
                    <input id="register-form-input-fullname" placeholder="Full Name"/>
                </div>  
                <div className="register-form-input">
                    <input id="register-form-input-email" placeholder="Email Address"/>
                </div>  
                <div className="register-form-input">
                    <input id="register-form-input-password" placeholder="Password"/>
                </div> 
                <div className="register-form-input">
                    <input id="register-form-input-password-confirm" placeholder="Confirm Password"/>
                </div>
                <div className="register-form-error" id="register-form-error">Email address already in use</div>  
                <div className="register-form-register" onClick={this.attemptRegistration}>Register</div>
                <div className="register-form-login" onClick={this.gotoLogin}>Already a member? Login here</div>
            </div>
        );
    }
}