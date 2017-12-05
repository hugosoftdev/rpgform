/* eslint-disable max-len */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from '../../ui/layouts/App.js';
import sheetsContainer from '../../ui/containers/sheets';
import GroupSettings from '../../ui/components/GroupSettings';
import Index from '../../ui/pages/Index.js';


const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    replace({
      pathname: '/index',
      state: {
        nextPathname: nextState.location.pathname,
      },
      fastRender: true,
    });
  }
};

Meteor.startup(Tracker.autorun(() => {
  render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute name="index" component={Index} onEnter={authenticate} fastRender={true}/>
      <Route name="index" path="/index" component={Index} fastRender={true} />
      <Route name='index' path='/index/:groupId' component={Index} />
      <Route name="sheets" path="/sheets" component={sheetsContainer} fastRender={true} />
      <Route name='sheets' path='/sheets/:groupId' component={sheetsContainer} />
      <Route name="settings" path="/settings" component={GroupSettings} fastRender={true} />
      <Route name='settings' path='/settings/:groupId' component={GroupSettings} />
    </Route>
  </Router>, document.getElementById('react-root'));
}));
