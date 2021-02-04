import axios, { AxiosResponse } from "axios";

const token = localStorage.getItem("token") || "";
axios.defaults.timeout = 300000;
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
    return data;
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error.name); // 返回接口返回的错误信息
  }
);
export default instance;
