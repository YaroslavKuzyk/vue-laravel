import axios from "axios";
import { AxiosError } from "axios";
import $api from "@/api";
import router from "@/router";

const paramsSerializer = (params: { [key: string]: any }) => {
  const queryString: string = Object.keys(params)
    .map((key) => {
      return Array.isArray(params[key])
        ? `${key}=[${params[key].join(",")}]`
        : `${key}=${params[key]}`;
    })
    .join("&");

  return queryString;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      router.push({ name: "login" });
    }

    return Promise.reject(error);
  }
);

export default ({
  url = "/",
  method = "GET",
  headers = {},
  params = {},
  data = {},
}) => {
  url = $api.config.API + url;

  return axios({
    url,
    method,
    headers,
    params,
    withCredentials: true,
    data,
    paramsSerializer,
  }).catch((error: AxiosError<unknown>) => {
    throw error;
  });
};
