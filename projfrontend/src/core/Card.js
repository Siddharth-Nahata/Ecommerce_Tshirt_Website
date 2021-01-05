import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";       //When we click a user on add to cart and then we want to redirect him onto the cart page
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,                                       //receiving the product props
  addtoCart = true,                              //If the value is false we will not display add to cart and remove from cart
  removeFromCart = false,
  reload = undefined,                           //This is for force mounting of component
  setReload = (f) => f,                         // function(f){return f}
  
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default";

  const addToCart = () => {
    if (isAuthenticated()) {                      //If user is authenticated
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAredirect = (redirect) => {               //function to redirect user to cart 
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {             //function to show add to cart button conditionally
    return (
      addtoCart && (                                 //if addtoCart is true we will show the add to cart button
        <button
          onClick={addToCart}                        //we are passing reference as we dont want to run it directly
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            //TODO: handle this too
            removeItemFromCart(product.id);
            setReload(!reload);                         //Once the cart is removed from localstorage.There should be some value that needs to be changed because this value stays in the state of the react,then component remounts itself
                                                        //!reload is for coverting true into false and false into true
            console.log("Product removed from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getAredirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}                                            {/* Injecting the values from above variable we have defined */}

        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
 