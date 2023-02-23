import axios from 'axios';

export const CashierApi = axios.create({
  baseURL: 'http://localhost:5124',
});

CashierApi.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

CashierApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);