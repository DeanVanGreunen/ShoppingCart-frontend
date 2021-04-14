const axios = require('axios').default;
axios.defaults.withCredentials = true; // Allows Axios to send and recieve cookies

class API {
    // AUTH APIs
    static isLoggedIn(api_key, callback){
     let url = 'http://127.0.0.1:8000/api/v1/is_logged_in';
     axios.post(url, {'api_key': api_key}).then(result => { callback(result); });
    } 
    static login(email, password, callback){
     let url = 'http://127.0.0.1:8000/api/v1/login';
     let data = {'email': email , 'password': password};
     axios.post(url, data).then(result => { callback(result); });
   } 
   static register(fullname, email, password, callback){
        let url = 'http://127.0.0.1:8000/api/v1/register';
        let data = {'fullname':fullname, 'email': email , 'password': password};
        axios.post(url, data).then(result => { callback(result); });
   }
   static logout(api_key, callback){
        let url = 'http://127.0.0.1:8000/api/v1/logout';
        axios.post(url, {'api_key': api_key}).then(result => { callback(result); });
   }

   // PRODUCT APIs
   static getProduct(id, callback){
        let url = 'http://127.0.0.1:8000/api/v1/get_product';
        let data = {'id': id };
        axios.post(url, data).then(result => { callback(result); });
   }

   static listProducts(callback){
        let url = 'http://127.0.0.1:8000/api/v1/list_product';
        axios.post(url, {}).then(result => { callback(result); });
   }
   static getProductFromIDandQuantityArray(data_array, callback){
     let url = 'http://127.0.0.1:8000/api/v1/get_products_from_ids_and_quantity_array';
     axios.post(url, {'data':data_array}).then(result => { callback(result); });
   }
   static createOrders(api_key, data, callback){
        let url = 'http://127.0.0.1:8000/api/v1/create_orders';
        axios.post(url, {'api_key': api_key, 'data':data}).then(result => { callback(result); });
   }
   // PREVIOUS ORDERS APIs
   static getOrderHistory(api_key, callback){
        let url = 'http://127.0.0.1:8000/api/v1/order/history';
        axios.post(url, {'api_key': api_key}).then(result => { callback(result); });
   }
}

export default API