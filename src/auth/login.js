import request from 'utils/request';
import { LOGIN } from 'endpoints';
import * as helpers from 'auth/helpers';

const result = {
  accessToken: 'some.random.token',
  refreshToken: 'some.random.refreshToken',
  accessTokenExpiresAt: 1702277966,
  role: '',
};

const login = async function (
  { email, password, google_token, role },
  setRole,
  setUser
) {
  if (google_token) {
    return request({
      to: LOGIN.url,
      method: LOGIN.method,
      params: {
        googleToken: google_token,
        role: role,
      },
    })
      .then(res => {
        helpers.setAccessToken(res.data.resource.accessToken);
        helpers.setAccessTokenExpiresAt(res.data.resource.expiresAt);
        switch (res.data.resource.information.role) {
          case 0:
            setRole('admin');
            break;
          case 1:
            setRole('student');
            break;
          case 2:
            setRole('lecturer');
            break;
          default:
        }
        setUser(res.data.resource.information);
        return res.data;
      })
      .catch(({ response }) => {
        throw new Error(
          response.data && Array.isArray(response.data.messages)
            ? response.data.messages[0]
            : 'Internal Server Error'
        );
      });
  }
  throw new Error(404);
};

export default login;
