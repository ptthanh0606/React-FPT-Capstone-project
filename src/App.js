import React, { lazy } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import * as Route from 'utils/router/routes';

import getPath from 'utils/router/helpers/getPath';
import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';
import { Layout } from '_metronic/layout';

// Prepare route dictionary ----------------------------------------------------
export const routes = new Map([
  ['home', '/'], // name => path (string or array of strings)
  ['auth', '/auth'],
  ['logout', '/logout'],
]);
export const inverseRoutes = new Map();

routes.forEach((value, key) => {
  if (Array.isArray(value)) for (const i of value) inverseRoutes.set(i, key);
  else inverseRoutes.set(value, key);
});

// End prepare route dictionary ------------------------------------------------

const Private = React.memo(function () {
  return (
    <>
      <AuthGuard />
      <Layout>
        <Switch>
          <Route.NormalRoute
            path={getPath('home', 1)}
            exact
            component={lazy(() =>
              import('views/Dashboard' /* webpackChunkName: "dashboard" */)
            )}
          />
        </Switch>
      </Layout>
    </>
  );
});

function App() {
  return (
    <React.Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route.PrivateRoute
          path={getPath('home', 1)}
          exact
          component={Private}
        />
        <Route.GuestRoute
          path={getPath('auth', 1)}
          component={lazy(() =>
            import('views/Auth' /* webpackChunkName: "auth" */)
          )}
        />
        <Route.NormalRoute
          path={getPath('logout')}
          exact
          component={lazy(() =>
            import('views/logout' /* webpackChunkName: "logout" */)
          )}
        />
        <Route.NormalRoute
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
