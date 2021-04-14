import './Product.css';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';

class Product extends React.Component {
    constructor(props) {
        super(props);      
        this.gotoDetailsPage = this.gotoDetailsPage.bind(this);        
      }
      gotoDetailsPage(){  
        let history = createBrowserHistory();
        history.push('/product/' + this.props.data.id);  
        history.go();      
      }
      render(){
          return (
            <div className="product-container" onClick={this.gotoDetailsPage}>
              <div className="product-image-container"><img alt="Product" src={ this.props.data.image } /></div>
              <div className="product-name">{ this.props.data.name }</div>
              <div className="product-price">ZAR&nbsp;{ (this.props.data.price / 100).toFixed(2) }</div>
            </div>
          );
      }
}

export default withRouter(Product)