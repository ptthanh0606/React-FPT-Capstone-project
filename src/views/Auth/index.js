import React from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from '_metronic/layout';
import Login from './pages/Login';
// import Registration from './pages/Registration';
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
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/* <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
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
            </div> */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute
                  path="/auth/login"
                  render={renderProps => (
                    <Login {...renderProps} state={props.location.state} />
                  )}
                />
                {/* <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                /> */}
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect
                  to={{ pathname: '/auth/login', state: props.location.state }}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
