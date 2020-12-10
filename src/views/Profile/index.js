import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from '_metronic/layout';
import NotOwnProfilePage from './NotOwn';
import OwnProfilePage from './Own';

const Profile = () => {
  return (
    <Layout>
      <Switch>
        {/* {personalRoutes()} */}
        <Route path="/profile/myprofile">
          <OwnProfilePage />
        </Route>
        {/* {viewProfileRoutes()} */}
        <Route path="/profile/admin/:id(\d+)">
          <NotOwnProfilePage />
        </Route>
        <Route path="/profile/:role/:id(\d+)">
          <NotOwnProfilePage />
        </Route>
      </Switch>
    </Layout>
  );
};

export default React.memo(Profile);
