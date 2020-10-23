import React, { lazy } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';
import { Layout } from '_metronic/layout';

// End prepare route dictionary ------------------------------------------------

const Base = React.memo(function Base() {
  return (
    <Switch>
      <Route.NormalRoute
        path={'/'}
        exact
        component={lazy(() =>
          import('views/Dashboard' /* webpackChunkName: "dashboard" */)
        )}
      />
    </Switch>
  );
});

const Private = React.memo(function Private() {
  return (
    <>
      <AuthGuard />
      <Layout>
        <Base />
      </Layout>
    </>
  );
});

const App = React.memo(function App() {
  return (
    <React.Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route.GuestRoute
          path="/auth"
          component={lazy(() =>
            import('views/Auth' /* webpackChunkName: "auth" */)
          )}
        />
        <Route.NormalRoute
          path="/logout"
          exact
          component={lazy(() =>
            import('views/logout' /* webpackChunkName: "logout" */)
          )}
        />
        <Route.PrivateRoute path="/" exact component={Private} />
        <Route.NormalRoute
          component={lazy(() =>
            import('views/errors/NotFound' /* webpackChunkName: "notFound" */)
          )}
        />
      </Switch>
    </React.Suspense>
  );
});

export default App;

export { BrowserRouter as Provider };
