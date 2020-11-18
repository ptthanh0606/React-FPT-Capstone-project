import React, { lazy } from 'react';
import { Switch, BrowserRouter, Route as DefaultRoute } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import roleSelector from 'auth/recoil/selectors/role';
import userAtom from 'store/user';
import semesterAtom from 'store/semester';

import * as Route from 'utils/router/routes';

import { LayoutSplashScreen } from '_metronic/layout/_core/MetronicSplashScreen';

import AuthGuard from 'auth/AuthGuard';
import { Layout } from '_metronic/layout';

import User from 'views/user';
import Admin from 'views/admin';

function fetchMe(setRole, setUser) {
  setRole('student');
  setUser({
    id: 0,
    email: 'duyhdse130491@fpt.edu.vn',
    name: 'Huynh Duc Duy',
    role: 'student',
    department: ['SE'],
  });
}

function fetchSemester(semester, setSemester, lastSemester, setLastSemester) {
  if (semester.id !== lastSemester) {
    setSemester({
      id: semester.id,
      name: 'Fall 2020',
      status: 1,
    });
    setLastSemester(semester.id);
  }
}

const RoleBasedLayout = React.memo(({ role }) => {
  return (
    <>
      {role === 'admin' && <Admin />}
      {['student', 'lecturer'].includes(role) && <User />}
    </>
  );
});

const Private = React.memo(function Private() {
  const [role, setRole] = useRecoilState(roleSelector);
  const setUser = useSetRecoilState(userAtom);
  const [semester, setSemester] = useRecoilState(semesterAtom);
  const [lastSemester, setLastSemester] = React.useState(0);

  React.useEffect(() => {
    fetchMe(setRole, setUser);
  }, [setRole, setUser]);

  React.useEffect(() => {
    if (role !== 'admin') {
      fetchSemester(semester, setSemester, lastSemester, setLastSemester);
    }
  }, [lastSemester, role, semester, setSemester]);

  return (
    <>
      <AuthGuard />
      <Layout>
        <RoleBasedLayout role={role} />
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
