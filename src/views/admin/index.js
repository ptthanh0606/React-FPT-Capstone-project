import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout } from '_metronic/layout';

const Admin = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path={'/dashboard'}
          exact
          component={lazy(() =>
            import('views/admin/Dashboard' /* webpackChunkName: "dashboard" */)
          )}
        />
        <Route
          path={'/semester'}
          component={lazy(() =>
            import('views/admin/Semesters' /* webpackChunkName: "semester" */)
          )}
        />
        <Route
          path={'/department'}
          component={lazy(() =>
            import(
              'views/admin/Departments' /* webpackChunkName: "department" */
            )
          )}
        />
        <Route
          path={'/lecturer'}
          component={lazy(() =>
            import('views/admin/Lecturers' /* webpackChunkName: "lecturer" */)
          )}
        />
        <Route
          path={'/student'}
          component={lazy(() =>
            import('views/admin/Students' /* webpackChunkName: "student" */)
          )}
        />
        <Route
          path={'/admin'}
          component={lazy(() =>
            import('views/admin/Admins' /* webpackChunkName: "admin" */)
          )}
        />
        <Route>
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Admin;
