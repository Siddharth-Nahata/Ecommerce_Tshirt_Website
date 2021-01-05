import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;        //Destructuring so that instead of calling values.name we can call simply name

  const handleChange = (name) =>                          //This is a High order function where we change any values it will transfer it into the variable/state.Here we are filling/changing name
    (event) => {                                       //event is changing the value of name by user     //Higher order functions are those which takes multiple inputs and based on that they change their values.
      setValues({ ...values, error: false, [name]: event.target.value }); //[The content inside [] will change as when user clicks to fill the desired state] 
    };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });                     //error:false is making sure that if any previous error was there it resets that and star processing the form with fresh
    signup({ name, email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {                                            //The email we are receiving from the data is not equal to the email that means we are not receiving the correct object
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

   const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please <Link
              to="/signin"
            >
              login now.
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                value={name}                              //it is important because this is what HOV needs.This form will trigger eveything which is dependent on the name
                onChange={handleChange("name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A signup for LCO user">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">
         {JSON.stringify(values)}                            {/*values is my state */}
      </p>
    </Base>
  );
};

export default Signup;
