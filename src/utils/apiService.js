import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    // console.log("START REQUEST", request);
    return request;
  },
  function (error) {
    // console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    // console.log("RESPONSE", response);
    return response;
  },
  function (error) {
    // console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default apiService;
