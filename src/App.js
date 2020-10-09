import React, { lazy } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Routes from 'utils/router/routes';

import getPath from 'utils/router/helpers/getPath';

// Prepare route dictionary ----------------------------------------------------

export const routes = new Map([
  ['home', ['/', '/home']], // name => path (string or array of strings)
  ['auth', '/auth'],
]);
export const inverseRoutes = new Map();

routes.forEach((value, key) => {
  if (Array.isArray(value)) for (const i of value) inverseRoutes.set(i, key);
  else inverseRoutes.set(value, key);
});

// End prepare route dictionary ------------------------------------------------

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Routes.PrivateRoute
          path={getPath('home', 1)}
          exact
          component={lazy(() =>
            import('views/Home' /* webpackChunkName: "home" */)
          )}
        />
        <Routes.GuestRoute
          path={getPath('auth', 1)}
          component={lazy(() =>
            import('views/Auth' /* webpackChunkName: "auth" */)
          )}
        />
        <Routes.NormalRoute
          component={lazy(() =>
            import('views/errors/NotFound' /* webpackChunkName: "notFound" */)
          )}
        />
      </Switch>
    </React.Suspense>
  );
}

export default App;

export { BrowserRouter as Provider };
