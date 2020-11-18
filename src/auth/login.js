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
  { email, password, google_token },
  setRole,
  setUser
) {
  if (google_token) {
    return request({
      to: LOGIN.url,
      method: LOGIN.method,
      params: {
        googleToken: google_token,
      },
    })
      .then(res => {
        helpers.setAccessToken(res.data.resource.accessToken);
        helpers.setAccessTokenExpiresAt(res.data.resource.expiredAt);
        switch (res.data.resource.information.role) {
          case 0:
            setRole('admin');
            break;
          case 1:
            setRole('student');
            break;
          case 2:
            setRole('lectutrer');
            break;
          default:
        }
        setUser(res.data.resource.information);
        return res.data;
      })
      .catch(({ response }) => {
        throw new Error(response.data.messages[0]);
      });
  } else if (email === 'admin@de.mo' && password === 'demo') {
    return {
      ...result,
      role: 'admin',
    };
  } else if (email === 'student@de.mo' && password === 'demo') {
    return {
      ...result,
      role: 'student',
    };
  } else if (email === 'lecturer@de.mo' && password === 'demo') {
    return {
      ...result,
      role: 'lecturer',
    };
  }
  throw new Error(404);
};

export default login;
