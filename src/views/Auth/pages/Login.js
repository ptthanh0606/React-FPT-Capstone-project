import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleLogin } from 'react-use-googlelogin';
import { useSetRecoilState } from 'recoil';
import { title } from 'store/meta';

import login from 'auth/login';
import constants from 'auth/constants';
import config from 'config';

import { role } from 'auth/recoil/selectors';
import userStore from 'store/user';
import SelectBox from 'components/SelectBox/SelectBox.js';

import './login.scss';

const roles = [
  {
    label: 'Admin',
    value: 0,
  },
  {
    label: 'Lecturer',
    value: 2,
  },
  {
    label: 'Student',
    value: 1,
  },
];

const initialValues = {
  email: '',
  password: '',
};

function Login({ state = {} }) {
  const setMetaTitle = useSetRecoilState(title);
  const setRole = useSetRecoilState(role);
  const setUser = useSetRecoilState(userStore);
  const [selectedRole, setSelectedRole] = React.useState(0);

  React.useEffect(() => {
    setMetaTitle('Login');
  }, [setMetaTitle]);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();

  const { signIn } = useGoogleLogin({
    clientId: config.google_oauth_client_id,
  });

  const loginWithGoogle = React.useCallback(() => {
    setStatus();

    signIn()
      .then(googleUser => {
        if (!googleUser) return;

        login(
          { google_token: googleUser.tokenId, role: selectedRole },
          setUser,
          setRole
        )
          .then(() => {
            if (state?.from)
              history.push(
                state?.from.pathname + state?.from.search + state?.from.hash
              );
            else history.push(constants.LOGIN_REDIRECT_TO);
          })
          .catch(({ message }) => {
            setStatus(message);
          });
      })
      .catch(err => {
        setStatus('Internal Server Error');
      });
  }, [history, selectedRole, setRole, setUser, signIn, state.from]);

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
      setLoading(true);
      setTimeout(() => {
        login(
          {
            email: values.email,
            password: values.password,
            role: selectedRole,
          },
          setUser,
          setRole
        )
          .then(() => {
            setLoading(false);
            if (state?.from)
              history.push(
                state?.from.pathname + state?.from.search + state?.from.hash
              );
            else history.push(constants.LOGIN_REDIRECT_TO);
          })
          .catch(() => {
            setLoading(false);
            setStatus('The login detail is incorrect');
          })
          .finally(() => {
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-15">
        <h3
          style={{
            fontSize: '2.5rem',
          }}
        >
          Login as{' '}
          <SelectBox
            options={roles}
            onChange={value => setSelectedRole(value)}
            placeholder="Select a role"
            value={selectedRole}
            style={{
              display: 'inline-block',
              width: 'auto',
              verticalAlign: 'text-bottom',
            }}
          />
        </h3>
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
