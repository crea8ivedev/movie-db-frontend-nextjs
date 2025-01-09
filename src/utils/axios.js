import axios from "axios";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://31.220.51.146:3004";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/"
    ) {
      window.location.href = "/";
      window.localStorage.removeItem("auth");
    }
    return Promise.reject(error);
  }
);

export default axios;
