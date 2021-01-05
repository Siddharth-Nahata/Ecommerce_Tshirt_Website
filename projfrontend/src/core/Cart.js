import React, { useState, useEffect } from "react";
import Base from "./Base";

import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [reload, setReload] = useState(false);  
  const [products, setProducts] = useState([]);   

  useEffect(() => {                      //useEffect is a kind of hook.Whenever there is something to be changed on the mount of component,in between somewhere or end of component then this useeffect is used.
    setProducts(loadCart());
  }, [reload]);                        //Inside the array we can pass list of variables in the state.anything changes here, it will mount the component/ reload the component. 

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Welcome to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (loadAllProducts(products)) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6">
          {products.length > 0
            ? (
              <PaymentB products={products} setReload={setReload} />
            )
            : (
              <h3>Please login or add something in cart</h3>
            )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;