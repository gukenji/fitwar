import axios from "axios";
// Create an Axios instance with default options

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const refreshAccessToken = async () => {
  const authTokens = localStorage.getItem("tokenInfo")
    ? JSON.parse(localStorage.getItem("tokenInfo") || "")
    : null;
  const response = await axiosInstance.post("/token/refresh/", authTokens);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
};

axiosInstance.interceptors.request.use(
  (req) => {
    const authTokens = localStorage.getItem("tokenInfo")
      ? JSON.parse(localStorage.getItem("tokenInfo") || "")
      : null;

    if (authTokens) {
      req.headers.Authorization = `Bearer ${authTokens?.access}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const new_token = await refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${new_token.access}`;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
