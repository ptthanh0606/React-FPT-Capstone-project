import React from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from '_metronic/layout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import '_metronic/_assets/sass/pages/login/classic/login-1.scss';

export default function Auth(props) {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}'/media/bg/bg-4.jpg')`,
            }}
          >
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={
                    process.env.PUBLIC_URL + '/media/logos/logo-letter-1.png'
                  }
                />
              </Link>
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to Metronic!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  The ultimate Bootstrap & React 16 admin theme framework for
                  next generation web apps.
                </p>
              </div>
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; 2020 Metronic
                </div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="font-weight-bold text-dark-50">
                Don't have an account yet?
              </span>
              <Link
                to="/auth/registration"
                className="font-weight-bold ml-2"
                id="kt_login_signup"
              >
                Sign Up!
              </Link>
            </div>
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute
                  path="/auth/login"
                  render={renderProps => (
                    <Login {...renderProps} state={props.location.state} />
                  )}
                />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect
                  to={{ pathname: '/auth/login', state: props.location.state }}
                />
              </Switch>
            </div>
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
