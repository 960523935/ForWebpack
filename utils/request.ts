import axios, { AxiosResponse } from "axios";
import { Base64 } from "js-base64";

const isServer = typeof window === "undefined";
const token = isServer
  ? ""
  : Base64.decode(localStorage.getItem("token") || "");

const instance = axios.create({
  timeout: 20000, // 超时20秒
  headers: {
    "content-type": "application/json",
    token,
  },
});

// http request 拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// http response 拦截器
instance.interceptors.response.use(
  ({ data, status, statusText }: AxiosResponse<any>) => {
    // 200 成功请求
    console.log(data, status, statusText);

    return data;
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => {
    if (!isServer) {
      new Image().src = `/api/addRequestErrLog?errorInfo=${error}&apiurl=${error.config.url}`;
    }
    return Promise.reject(error.name); // 返回接口返回的错误信息
  }
);
export default instance;
