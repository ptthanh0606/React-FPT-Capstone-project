import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NearestSemester from './nearest';
import AllSemester from './all';
import Semester from './Semester';

export default React.memo(function Semesters() {
  return (
    <Switch>
      <Route path="/semester/nearest" exact component={NearestSemester} />
      <Route path="/semester/all" exact component={AllSemester} />
      <Route path="/semester/:id(\d+)" component={Semester} />
      <Route>
        <Redirect to="/semester/nearest" />
      </Route>
    </Switch>
  );
});
