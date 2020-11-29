import React, { lazy } from 'react';

import { Switch, Route as DefaultRoute, useHistory } from 'react-router-dom';
import * as Route from 'utils/router/routes';

import { Layout } from '_metronic/layout';
import semesterAtom from 'store/semester';

import { useRecoilState } from 'recoil';
import request from 'utils/request';
import { READ_SEMESTER } from 'endpoints';
import { down } from 'views/admin/Semesters/transformers';

function fetchSemester(
  semester,
  setSemester,
  lastSemester,
  setLastSemester,
  history
) {
  if (semester.id !== lastSemester) {
    request({
      to: READ_SEMESTER(semester.id).url,
      method: READ_SEMESTER(semester.id).method,
    })
      .then(res => {
        const data = down(res?.data?.data);
        setSemester({
          id: data.id,
          name: data.name,
        });
        setLastSemester(data.id);
      })
      .catch(err => {
        history.push('/select-semester');
      });
  }
}

const User = () => {
  const history = useHistory();
  const [semester, setSemester] = useRecoilState(semesterAtom);
  const [lastSemester, setLastSemester] = React.useState(semester);

  React.useEffect(() => {
    fetchSemester(
      semester,
      setSemester,
      lastSemester,
      setLastSemester,
      history
    );
  }, [history, lastSemester, semester, setSemester]);
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
