import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleLogin } from 'react-use-googlelogin';
import { useRecoilState } from 'recoil';
import { title } from 'store/meta';

import * as helpers from 'auth/helpers';
import constants from 'auth/constants';
import config from 'config';
import request from 'utils/request';
import { LOGIN } from 'endpoints';

import './login.scss';

const result = {
  accessToken: 'some.random.token',
  refreshToken: 'some.random.refreshToken',
  accessTokenExpiresAt: 1702277966,
};

const initialValues = {
  email: '',
  password: '',
};

const login = async function ({ email, password, google_token }) {
  if (google_token) {
    return request({
      to: LOGIN.url,
      method: LOGIN.method,
      params: {
        googleToken: google_token,
      },
    })
      .then(res => {
        return {
          ...result,
          accessToken: res.data.resource.token,
        };
      })
      .catch(({ response }) => {
        throw new Error(response.data.messages[0]);
      });
  }
  throw new Error(404);
};

function Login({ state = {} }) {
  const [metaTitle, setMetaTitle] = useRecoilState(title);

  React.useEffect(() => {
    setMetaTitle('Login');
  }, [metaTitle, setMetaTitle]);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();

  const { signIn } = useGoogleLogin({
    clientId: config.google_oauth_client_id,
  });

  const loginWithGoogle = React.useCallback(() => {
    signIn().then(googleUser => {
      login({ google_token: googleUser.tokenId })
        .then(({ accessToken, refreshToken, accessTokenExpiresAt }) => {
          disableLoading();
          helpers.setAccessToken(accessToken);
          helpers.setRefreshToken(refreshToken);
          helpers.setAccessTokenExpiresAt(accessTokenExpiresAt);
          if (state?.from)
            history.push(
              state?.from.pathname + state?.from.search + state?.from.hash
            );
          else history.push(constants.LOGIN_REDIRECT_TO);
        })
        .catch(({ message }) => {
          setStatus(message);
        });
    });
  }, [history, signIn, state.from]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required field'),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required field'),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = fieldName => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return 'is-invalid';
    }

    if (formik.touched[fieldName] && !formik.errors[fieldName]) {
      return 'is-valid';
    }

    return '';
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login({ email: values.email, password: values.password })
          .then(({ accessToken, refreshToken, accessTokenExpiresAt }) => {
            disableLoading();
            helpers.setAccessToken(accessToken);
            helpers.setRefreshToken(refreshToken);
            helpers.setAccessTokenExpiresAt(accessTokenExpiresAt);
            if (state?.from)
              history.push(
                state?.from.pathname + state?.from.search + state?.from.hash
              );
            else history.push(constants.LOGIN_REDIRECT_TO);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus('The login detail is incorrect');
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Login</h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ||
          (status && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">
                {formik.status || status}
              </div>
            </div>
          ))}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'email'
            )}`}
            name="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div
              className="fv-plugins-message-container"
              style={{ marginTop: 5, marginLeft: 10, color: '#f64e60' }}
            >
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'password'
            )}`}
            name="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div
              className="fv-plugins-message-container"
              style={{ marginTop: 5, marginLeft: 10, color: '#f64e60' }}
            >
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forgot password
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      <div id="or" className="form-group">
        OR
      </div>
      <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
        <button
          className={`w-100 btn btn-danger font-weight-bold px-9 py-4 my-3`}
          onClick={loginWithGoogle}
        >
          <i className="fab fa-google mr-4"></i>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
