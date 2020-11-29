import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from '_metronic/layout';

const Profile = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/profile/lecturer/:id(\d+)">cac lec</Route>
        <Route path="/profile/student/:id(\d+)">cac stu</Route>
      </Switch>
    </Layout>
  );
};

export default React.memo(Profile);
