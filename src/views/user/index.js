import React, { lazy } from 'react';

import { Switch, Route as DefaultRoute } from 'react-router-dom';
import * as Route from 'utils/router/routes';

import { Layout } from '_metronic/layout';
import semesterAtom from 'store/semester';

import { useRecoilState } from 'recoil';

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

const User = () => {
  const [semester, setSemester] = useRecoilState(semesterAtom);
  const [lastSemester, setLastSemester] = React.useState(semester);

  React.useEffect(() => {
    fetchSemester(semester, setSemester, lastSemester, setLastSemester);
  }, [lastSemester, semester, setSemester]);
  return (
    <Switch>
      <Route.NormalRoute
        path="/select-semester"
        component={lazy(() => import('views/user/SelectSemester'))}
      />
      <Route.NormalRoute
        path="/semester/:id(\d+)"
        component={lazy(() => import('views/user/SetSemester'))}
      />
      <DefaultRoute>
        <Layout>
          <Switch>
            <Route.SemesterSelected
              path="/dashboard"
              component={lazy(() => import('views/user/Dashboard'))}
            />
            <Route.SemesterSelected
              path="/topic/:id(\d+)"
              component={lazy(() => import('views/user/Topics/Topic'))}
            />
            <Route.SemesterSelected
              path="/topic"
              component={lazy(() => import('views/user/Topics'))}
            />
            <Route.SemesterSelected
              path="/team/:id(\d+)"
              component={lazy(() => import('views/user/Teams/Team'))}
            />
            <Route.SemesterSelected
              path="/team"
              component={lazy(() => import('views/user/Teams'))}
            />
            <Route.RedirectRoute to="/dashboard" />
          </Switch>
        </Layout>
      </DefaultRoute>
    </Switch>
  );
};

export default User;
