export const addItemToCart = (item, next) => {                  //When I click on Add to cart button i will store this informtion of this tshirt in my LocalStorage/Browser Localhost
    let cart = [];                                    //we want all information of the item that is id,name,pricing etc.
    if (typeof window !== undefined) {                //next is a method where we use it to provide a callback functionality to anyone who is using this method
      if (localStorage.getItem("cart")) {             //2) we are grabbing the local storage and if cart property is there we want that
        cart = JSON.parse(localStorage.getItem("cart"));   //3)Adding that cart value (if any available) into my empty array
      }                                                    //1)The window object is available only in the browser.If it is not undefined means it is available
  
      cart.push({
        ...item,                                //This item is a big object we are accessing everything by ... and pushing it to the cart
      });
      localStorage.setItem("cart", JSON.stringify(cart));       //it converts arrays of objects TO string
      next();
    }
  };
  
  export const loadCart = () => {                    //This function is for when we move on to another component/page i.e, cart we write method which picks up all info from cart and show us directly  
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")); //When receiving data from a web server, the data is always a string.Parse the data with JSON.parse(), and the data becomes a JavaScript object.

        
      }
    }
  };
  
  export const removeItemFromCart = (productId) => {          //Here user is passing the productid
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {                  //we are grabbing index of product too. //we are looping through the product and filtering the productid splice out basically
        if (product.id === productId) {                     //we  can use map,slice,filter anything 
          cart.splice(i, 1);                                //we are splicing the index with 1 item
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = (next) => {         //Lets say user has made a purchase so we just want to flush all the info from the localstorage that we have been storing 
    if (typeof window !== undefined) {          //here next is used because we want user to have a callback functionality because after emptying the cart he might want to redirect the user somewhere.
      localStorage.removeItem("cart");
      let cart = [];                           //we are again taking a cart because of load cart function.if he didnt find any cart then it will throw error
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
      