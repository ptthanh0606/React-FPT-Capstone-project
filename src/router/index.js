import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { lazy } from 'react';

import { BrowserRouter } from 'react-router-dom';

import ConditionalRoute from './route/ConditionalRoute';
import PrivateRoute from './route/PrivateRoute';
import GuestRoute from './route/GuestRoute';
import RedirectRoute from './route/RedirectRoute';
import Route from './route/Route';

import getPath from './helpers/getPath';

// Prepare route dictionary ----------------------------------------------------

export const routes = new Map([
  ['home', ['/', '/home']], // name => path (string or array of strings)
  ['login', '/login'],
  ['home2', '/home2'],
]);
export const inverseRoutes = new Map();

routes.forEach((value, key) => {
  if (Array.isArray(value)) for (const i of value) inverseRoutes.set(i, key);
  else inverseRoutes.set(value, key);
});

// End prepare route dictionary ------------------------------------------------

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          path={getPath('home', 1)}
          exact
          component={lazy(() =>
            import('views/Home' /* webpackChunkName: "home" */)
          )}
        />
        <RedirectRoute path={getPath('home2', 1)} exact to={getPath('home')} />
        <ConditionalRoute
          path={getPath('login', 1)}
          exact
          component={lazy(() =>
            import('views/Login' /* webpackChunkName: "login" */)
          )}
          condition={props => {
            return false;
          }}
          reason={"Don't have permission"}
          redirectTo={getPath('home')}
          redirectData={function (props) {
            console.log(props);
          }}
        />
      </Switch>
    </Suspense>
  );
}

export default {
  Router,
  Provider: BrowserRouter,
};

export { Router, BrowserRouter as Provider };
