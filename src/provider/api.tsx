import axios from 'axios';
import {store} from '@redux/store';
import {resetAccount} from '@redux/slice/account';
import {Alert} from 'react-native';

import {API_URL} from '@env';
// const API_URL = 'http://192.168.1.105:8001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(async config => {
  try {
    const token = store.getState().account.accessToken;
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error fetching token:', error);
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    console.log(error.code);
    if (error?.code && error.code === 'ERR_NETWORK') {
      return Promise.reject({
        response: {
          data: {
            details: 'Error.netinfo_disconnect_alert',
          },
        },
      });
    }

    if (error?.code && error.code === 'ERR_BAD_RESPONSE') {
      return Promise.reject({
        response: {
          data: {
            details: 'Error.errorServer',
          },
        },
      });
    }
    if (error?.response?.data?.statusCode === 401) {
      Alert.alert('Expired version', 'Please log in again');
      store.dispatch(resetAccount());
    }
    return Promise.reject(error);
  },
);
