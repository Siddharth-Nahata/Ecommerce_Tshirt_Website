import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";

import "../styles.css";
import Card from "./Card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {                               //response.json returns a promise.  
        if (data.error) {                           
          setError(data.error);
          console.log(error);
        } else {
          setProducts(data);
        }
      });
  };

  useEffect(() => {                          //useEffect is a callback and it has empty array for running this method again based on some variable.If that changes then we run again
    loadAllProducts();
  }, []);

  return (                                  //Base here is acting like children as discussed in Base.js
    <Base title="Home Page" description="Welcome to Tshirt store">    
      <h1>Home component</h1>
      <div className="row">
        {products.map((product, index) => {          //We are looping through products.Index is because we dont want to loop through same object again & again 
          return (
            <div key={index} className="col-4 mb-4">    
              <Card product={product} />               {/* we are passing product as prop to the card component */}

            </div>
          );
        })}
      </div>
    </Base>
  );
}
