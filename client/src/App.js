import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>

          <Route path="/:userId/places">
            <UserPlaces exact />
          </Route>

          <Route path="/places/new" exact>
            <NewPlace />
          </Route>

          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>

          <Route path="/auth">
            <Auth />
          </Route>


          <Redirect to="/" />
        </Switch>
      </main>

    </Router>
  );
}

export default App;
