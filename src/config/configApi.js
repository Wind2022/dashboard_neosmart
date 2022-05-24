import axios from "axios";

export const callApi = (url, method = "GET", data = null) => {
  const access_token = localStorage.getItem("token");
  return axios({
    url,
    method,
    data,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
