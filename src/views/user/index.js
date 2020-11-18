import React, { lazy } from 'react';

import { Switch } from 'react-router-dom';
import * as Route from 'utils/router/routes';

const User = () => {
  return (
    <Switch>
      <Route.NormalRoute
        path="/select-semester"
        component={lazy(() => import('views/user/SelectSemester'))}
      />
      <Route.SemesterSelected
        path="/dashboard"
        component={lazy(() => import('views/user/Dashboard'))}
      />
      <Route.NormalRoute
        path="/semester/:id(\d+)"
        component={lazy(() => import('views/user/SetSemester'))}
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
  );
};

export default User;
