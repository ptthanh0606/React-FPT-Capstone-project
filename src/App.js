import React, { lazy } from 'react';
import { Switch, BrowserRouter, Route as DefaultRoute } from 'react-router-dom';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';
import { Layout } from '_metronic/layout';

const Private = React.memo(function Private() {
  return (
    <>
      <AuthGuard />
      <Layout>
        <Switch>
          <Route.NormalRoute
            path={'/dashboard'}
            exact
            component={lazy(() =>
              import('views/Dashboard' /* webpackChunkName: "dashboard" */)
            )}
          />
          <DefaultRoute path={'/user'}>User</DefaultRoute>
          <Route.NormalRoute
            path={'/semester'}
            component={lazy(() =>
              import('views/Semesters' /* webpackChunkName: "semester" */)
            )}
          />
          <Route.NormalRoute
            path={'/department'}
            component={lazy(() =>
              import('views/Departments' /* webpackChunkName: "department" */)
            )}
          />
          <Route.NormalRoute
            path={'/lecturer'}
            component={lazy(() =>
              import('views/Lecturers' /* webpackChunkName: "lecturer" */)
            )}
          />
          <Route.NormalRoute
            path={'/student'}
            component={lazy(() =>
              import('views/Students' /* webpackChunkName: "student" */)
            )}
          />
          <Route.NormalRoute
            path={'/admin'}
            component={lazy(() =>
              import('views/Admins' /* webpackChunkName: "admin" */)
            )}
          />
          <Route.RedirectRoute to="/dashboard" />
        </Switch>
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
        <Route.PrivateRoute
          path="/logout"
          exact
          component={lazy(() =>
            import('views/logout' /* webpackChunkName: "logout" */)
          )}
        />
        <Route.PrivateRoute path="/" component={Private} />
      </Switch>
    </React.Suspense>
  );
});

export default App;

export { BrowserRouter as Provider };
