import React, { lazy } from 'react';
import { Switch, BrowserRouter, Route as DefaultRoute } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import roleSelector from 'auth/recoil/selectors/role';
import userAtom from 'store/user';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';
import { Layout } from '_metronic/layout';

const Private = React.memo(function Private() {
  const [role, setRole] = useRecoilState(roleSelector);
  const setUser = useSetRecoilState(userAtom);

  React.useEffect(() => {
    setRole('student');
    setUser({
      id: 0,
      email: 'duyhdse130491@fpt.edu.vn',
      name: 'Huynh Duc Duy',
      department: ['SE'],
    });
  }, [setRole, setUser]);

  return (
    <>
      <AuthGuard />
      <Layout>
        {role === 'admin' && (
          <Switch>
            <Route.NormalRoute
              path={'/dashboard'}
              exact
              component={lazy(() =>
                import(
                  'views/admin/Dashboard' /* webpackChunkName: "dashboard" */
                )
              )}
            />
            <DefaultRoute path={'/user'}>User</DefaultRoute>
            <Route.NormalRoute
              path={'/semester'}
              component={lazy(() =>
                import(
                  'views/admin/Semesters' /* webpackChunkName: "semester" */
                )
              )}
            />
            <Route.NormalRoute
              path={'/department'}
              component={lazy(() =>
                import(
                  'views/admin/Departments' /* webpackChunkName: "department" */
                )
              )}
            />
            <Route.NormalRoute
              path={'/lecturer'}
              component={lazy(() =>
                import(
                  'views/admin/Lecturers' /* webpackChunkName: "lecturer" */
                )
              )}
            />
            <Route.NormalRoute
              path={'/student'}
              component={lazy(() =>
                import('views/admin/Students' /* webpackChunkName: "student" */)
              )}
            />
            <Route.NormalRoute
              path={'/admin'}
              component={lazy(() =>
                import('views/admin/Admins' /* webpackChunkName: "admin" */)
              )}
            />
            <Route.RedirectRoute to="/dashboard" />
          </Switch>
        )}
        {role === 'student' && (
          <Switch>
            <Route.NormalRoute
              path="/select-semester"
              component={lazy(() => import('views/user/SelectSemester'))}
            />
            <Route.SemesterSelected
              path="/dashboard"
              component={lazy(() => import('views/user'))}
            />
            <Route.RedirectRoute to="/dashboard" />
          </Switch>
        )}
        {role === 'lecturer' && <>Hello lecturer</>}
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
