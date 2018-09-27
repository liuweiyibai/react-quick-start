import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import Dashborad from '@/views/Dashborad/Dashborad';
import Login from '@/views/Login/Login';


export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/index" push />}></Route>
      <Route path="/index" component={Dashborad}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  </Router>
)