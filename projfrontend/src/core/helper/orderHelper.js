import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {        //orderData is the data that we have defined in the backend like transaction id,amount
  const formData = new FormData();

  for (const name in orderData) {
    formData.append(name, orderData[name]);
  }

  return fetch(`${API}order/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
