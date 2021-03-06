import React, { lazy } from 'react';
import {
  Switch,
  BrowserRouter,
  useHistory,
  Route as DefaultRoute,
} from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import roleSelector from 'auth/recoil/selectors/role';
import userAtom from 'store/user';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';

import User from 'views/user';
import Admin from 'views/admin';
import Profile from 'views/Profile';

import { ME } from 'endpoints';
import request from 'utils/request';

import LocalStorage from 'utils/localStorage';
import semesterAtom from 'store/semester';

function fetchMe(setRole, setUser, history, setSemester) {
  request({
    to: ME.url,
    method: ME.method,
  })
    .then(({ data }) => {
      let role;

      switch (data.data.role) {
        case '0':
          role = 'admin';
          break;
        case '1':
          role = 'student';
          if (data?.data?.semesterId) {
            LocalStorage.set('semester_id', data?.data?.semesterId);

            setSemester({
              id: Number(data?.data?.semesterId),
            });
          }
          break;
        case '2':
          role = 'lecturer';
          break;
        default:
          throw new Error('Not valid role!');
      }

      setRole(role);

      setUser({
        id: data.data.id,
        code: data.data.code,
        email: data.data.email,
        name: data.data.name,
        department: data.data.department,
        role: role,
        teamId: data.data?.teamId,
      });
    })
    .catch(err => {
      history.push('/logout');
    });
}

const RoleBasedLayout = React.memo(({ role }) => {
  return (
    <>
      {role === 'admin' && <Admin />}
      {['student', 'lecturer'].includes(role) && <User />}
      {!['student', 'lecturer', 'admin'].includes(role) && (
        <LayoutSplashScreen />
      )}
    </>
  );
});

const Private = React.memo(function Private() {
  const [role, setRole] = useRecoilState(roleSelector);
  const setSemester = useSetRecoilState(semesterAtom);
  const setUser = useSetRecoilState(userAtom);
  const history = useHistory();

  React.useEffect(() => {
    fetchMe(setRole, setUser, history, setSemester);
  }, [history, setRole, setSemester, setUser]);

  return (
    <>
      <AuthGuard />
      <Switch>
        <DefaultRoute path="/profile">
          <Profile />
        </DefaultRoute>
        <DefaultRoute>
          <RoleBasedLayout role={role} />
        </DefaultRoute>
      </Switch>
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
