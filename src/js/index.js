import Vue from "vue"
import Axios from "axios"
import qs from 'qs'
//Vue.prototype.$axios=Axios;
//添加请求时拦截器
Axios.interceptors.request.use(function(config){
  if(config.method=="post"||config.method=="put"){
    config.data=qs.stringify(config.data);
    config.headers = Object.assign({}, config.headers, {'Content-Type': "application/json"});
    config.transformRequest = [function (data) {
      data = JSON.stringify(config.params)
      return data;
    }]
  }
  return config;
},function(error){
  return error.Promise.reject(error);
});
//添加响应时的拦截
Axios.interceptors.response.use(function(response){
  // 返回响应时做一些处理
  return response;
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error);
});

export default Axios;
