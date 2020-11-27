import React, { lazy } from 'react';
import { Switch, BrowserRouter, useHistory } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import roleSelector from 'auth/recoil/selectors/role';
import userAtom from 'store/user';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';

import User from 'views/user';
import Admin from 'views/admin';

import { ME } from 'endpoints';
import request from 'utils/request';

function fetchMe(setRole, setUser, history) {
  request({
    to: ME.url,
    method: ME.method,
  })
    .then(({ data }) => {
      let role;

      switch (data.data.role) {
        case 0:
          role = 'admin';
          break;
        case 1:
          role = 'student';
          break;
        case 2:
          role = 'lecturer';
          break;
        default:
      }

      setRole(role);

      setUser({
        id: data.data.id,
        code: data.data.code,
        email: data.data.email,
        name: data.data.name,
        department: data.data.department,
        role: role,
      });
    })
    .catch(err => {
      history.push('/logout');
    });
}

const RoleBasedLayout = React.memo(({ role }) => {
  return (
    <>
      {/* Need loading */}
      {role === 'admin' && <Admin />}
      {['student', 'lecturer'].includes(role) && <User />}
    </>
  );
});

const Private = React.memo(function Private() {
  const [role, setRole] = useRecoilState(roleSelector);
  const setUser = useSetRecoilState(userAtom);
  const history = useHistory();

  React.useEffect(() => {
    fetchMe(setRole, setUser, history);
  }, [history, setRole, setUser]);

  return (
    <>
      <AuthGuard />
      <RoleBasedLayout role={role} />
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
