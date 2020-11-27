import axios from 'axios';
import { helpers as authHelpers } from 'auth';

const CancelToken = axios.CancelToken;
export const getSource = CancelToken.source;
export const isCancel = axios.isCancel;

const config = {
  timeout: 0,
};

function defaultHeaders() {
  const headers = {};

  headers['Content-Type'] = 'application/json';

  const access_token = authHelpers.getAccessToken();
  if (access_token !== null && !authHelpers.tokenIsExpired())
    headers.Authorization = `Bearer ${access_token}`;

  return headers;
}

async function request({
  to,
  method = 'GET',
  data = {},
  params = {},
  headers = {},
  r = true,
  source = {},
  ...rest
}) {
  if (authHelpers.tokenIsAlmostExpired() || !authHelpers.getAccessToken()) {
    if (!authHelpers.getRefreshToken()) authHelpers.clearAuth();
    // refresh token right before request
    // else if (r)
    //   await refresh()
    //     .then(res => {
    //       authHelpers.setAccessToken(res.data.access_token);
    //       authHelpers.setRefreshToken(res.data.refresh_token);
    //       authHelpers.setAccessTokenExpiresAt(res.data.expires_at);
    //     })
    //     .catch(() => {
    //       authHelpers.clearAuth();
    //     });
  }

  const s = getSource();
  source.cancel = s.cancel;
  source.token = s.token;

  return axios({
    headers: { ...defaultHeaders(), ...headers },
    url: to,
    method,
    data,
    params,
    config,
    cancelToken: s.token,
    ...rest,
  }).catch(err => Promise.reject({ ...err, isCancel: axios.isCancel(err) }));
}

function Get(props) {
  return request({
    method: 'GET',
    ...props,
  });
}

function Post(props) {
  return request({
    method: 'POST',
    ...props,
  });
}

function Put(props) {
  return request({
    method: 'PUT',
    ...props,
  });
}

function Delete(props) {
  return request({
    method: 'DELETE',
    ...props,
  });
}

export default request;

export { Get, Put, Post, Delete };
