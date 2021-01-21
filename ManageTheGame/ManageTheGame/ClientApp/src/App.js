import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CompetitionGrid } from './components/competition/CompetitionGrid';
import { CompetitionStartup } from './components/competition/CompetitionStartup';
import { CompetitionStarted } from './components/competition/CompetitionStarted';
import { CompetitionDetails } from './components/competition/CompetitionDetails';
import { ClubGrid } from './components/club/ClubGrid';
import { ClubDetails } from './components/club/ClubDetails';
import { StatsGrid } from './components/stats/StatsGrid';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import 'devextreme/dist/css/dx.common.css';
import './themes/dx.generic.dark-moon-scheme.css';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route exact path='/competitions' component={CompetitionGrid} />
        <Route exact path='/competitions/:id' component={CompetitionDetails} />
        <Route exact path='/clubs' component={ClubGrid} />
        <Route exact path='/clubs/:id' component={ClubDetails} />
        <Route exact path='/stats' component={StatsGrid} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
