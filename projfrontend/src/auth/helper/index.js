import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";

export const signup = (user) => {
  return fetch(`${API}user/`, {
    method: "POST",                                      //Hitting the api with post request
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),                          //converting into json format and then sending to the api
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    console.log(user[name]);
    formData.append(name, user[name]);                    //Adding data to the formdata
  }

  // const {email, password} = user;
  // const formData = new FormData();                    //In formData we dont directly put the values.We have to mention the key values pairs 
  // formData.append('email', email)                      append('key','values')
  // formData.append('password', password)

  for (var key of formData.keys()) {                    //Destructuring the keys of formData so that we get to know what we are storing in keys.
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",

    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();                     //it returns a promise
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {                //It grabs the data and you will give it a session token and this method is responsible for putting the session token into local storage
  if (typeof window !== undefined) {                          //next is for allowing user to write a callback 
    localStorage.setItem("jwt", JSON.stringify(data));        //creating an custom token in localstorage.It is a key value pair. jwt is the keyname we are storing
    next();
  }
};

export const isAuthenticated = () => {                    //To check user is authenticated or not
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
    //TODO: compare JWT with database json token
  } else {
    return false;
  }
};

export const signout = (next) => {                              //This is responsible for deleting that session token and clearing the cart 
  const userId = isAuthenticated() && isAuthenticated().user.id;   //when we run isAuthenticated(),we can access the user of it & as well as id too.

  console.log("USERID: ", userId);

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    cartEmpty(() => {});
    //next();

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout success");
        next();
      })
      .catch((err) => console.log(err));
  }
};
