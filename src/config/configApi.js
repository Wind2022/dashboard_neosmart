import axios from "axios";

export const callApi = (url, method = "GET", data = null, access_token) => {
  //   const access_token = localStorage.getItem("token");

  return axios({
    url,
    method,
    data,
    Headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
