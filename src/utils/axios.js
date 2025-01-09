import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://192.168.5.139:3002";
axios.defaults.withCredentials = true;
axios.defaults.adapter = "fetch";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error, "response");

    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/"
    ) {
      // window.location.href = "/";
      // window.localStorage.removeItem("auth");
    }
    return Promise.reject(error);
  }
);

export default axios;
