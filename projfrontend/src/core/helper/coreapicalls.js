import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}product`, { method: "GET" })        //API = localhost:8000/api/
    .then((response) => {
      return response.json();                             //converting json to object
    })
    .catch((err) => console.log(err));
};