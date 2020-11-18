import React, { lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

const User = () => {
  return (
    <Switch>
      <Route
        path="/select-semester"
        component={lazy(() => import('views/user/SelectSemester'))}
      />
      <Route
        path="/dashboard"
        component={lazy(() => import('views/user/Dashboard'))}
      />
      <Route
        path="/semester/:id(\d+)"
        component={lazy(() => import('views/user/SetSemester'))}
      />
      <Route
        path="/topic"
        component={lazy(() => import('views/user/Topics'))}
      />

      <Route path="/team" component={lazy(() => import('views/user/Teams'))} />
      <Route>
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
};

export default User;
