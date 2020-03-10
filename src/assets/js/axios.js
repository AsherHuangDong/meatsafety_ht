import Axios from "axios";
import Router from '../../router'
console.log('token', sessionStorage.getItem('token'))
Axios.defaults = Object.assign(Axios.defaults, {
  //baseURL: "http://localhost:8888",
  baseURL:'http://admin.mqs.talkingcake.cn',
  timeout: 0,
  withCredentials: true
});
console.log('token', sessionStorage.getItem('token'))
// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    if (config.axiosLoading) {
      // Indicator.open();
    }
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'accessToken': sessionStorage.getItem('token')
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    if (response.data) {
      if (response.data.code) {
        switch (response.data.code) {
          case 0: //正常
            return response;
            break;
          case 600:
            Router.push('/')
          default:
            return response;
            // Message.error(response.data.msg);
            // return Promise.reject(response.data.msg);
            break;
        }
      } else {
        return response;
      }
    } else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
