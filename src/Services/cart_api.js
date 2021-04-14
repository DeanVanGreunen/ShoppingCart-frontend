
class CartAPI {
    static getProducts(){
        let json_string = localStorage.getItem('cart') || "[]";
        let arr = JSON.parse(json_string);
        return arr;
    };
    static addToCart(product_id, quantity){
        if(quantity <= 0){ // Don't allow negitave or 0 quantity values
            return;
        }
        let json_string = localStorage.getItem('cart') || "[]";
        let arr = JSON.parse(json_string);
        // START OF BUG FIX
        // BUG: Without this code, Products can be Duplicated
        arr = arr.filter(function(item) {
            return Number(item['id']) !== Number(product_id);
        });
        // END OF BUG FIX
        arr.push({'id':Number(product_id), 'quantity': Number(quantity)});
        arr = arr.flat();
        json_string = JSON.stringify(arr);
        localStorage.setItem('cart', json_string);
    };
    static deleteProductFromCart(product_id){
        let json_string = localStorage.getItem('cart') || "[]";
        let arr = JSON.parse(json_string);
        arr = arr.filter(function(item) {
            return Number(item['id']) !== Number(product_id);
        });
        arr = arr.flat();
        json_string = JSON.stringify(arr);
        localStorage.setItem('cart', json_string);
    };
    static clearProducts(){
        localStorage.setItem('cart', "[]");
    }
};
export default CartAPI