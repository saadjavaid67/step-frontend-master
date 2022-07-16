import axios from 'axios';
import {
  setAuthInfo, clearAuthInfo, getRefreshToken,
} from '../../helpers/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
});

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRrefreshed(token) {
  subscribers.map(cb => cb(token));
}

function forceLogout() {
  isRefreshing = false;
  clearAuthInfo();
  window.location = '/signin';
}

instance.interceptors.response.use(undefined, (err) => {
  const { config, response } = err;
  const originalRequest = config;

  if (response && response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      const params = new URLSearchParams();
      params.append('client_id', process.env.REACT_APP_OAUTH_CLIENT_ID);
      params.append('client_secret', process.env.REACT_APP_OAUTH_CLIENT_SECRET);
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', getRefreshToken());
      instance.post('/oauth/token', params).then((response) => {
        console.log(response);
        isRefreshing = false;
        setAuthInfo({
          ...response.data,
        });
        onRrefreshed(response.data.access_token);
        subscribers = [];
      }).catch(() => {
        console.log("catch");
        forceLogout();
      });
    }
    const requestSubscribers = new Promise((resolve) => {
      subscribeTokenRefresh((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
    return requestSubscribers;
  }
  return Promise.reject(err);
});


export default instance;