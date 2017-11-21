/* eslint-disable max-len */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from '../../ui/layouts/App.js';
import sheetsContainer from '../../ui/containers/sheets';

// Pages
import Index from '../../ui/pages/Index.js';

// Containers

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
      {/* <Route name='services' path='/servicos' component={ServicesContainer} onEnter={authenticate} fastRender={true}/>
      <Route name='professionals' path='/profissionais' component={ProfessionalsContainer} onEnter={authenticate} fastRender={true}/>

      <Route name='transactions' path='/transacoes' component={Transactions} onEnter={authenticate} fastRender={true}/>
      <Route name="login" path="/login" component={Login} fastRender={true} />
      <Route name="recover-password" path="/recover-password" component={RecoverPassword} fastRender={true}/>
      <Route name="reset-password" path="/recover-password/:token" component={ResetPassword} fastRender={true}/>
      <Route name="payables" path="/recebiveis" component={CalendarTransactions} onEnter={authenticate} fastRender={true}/>


      <Route name="companies" path='/admin' component={CompaniesContainer} onEnter={authenticate} fastRender={true}/>
      <Route name="companies" path='/admin/saloes' component={CompaniesContainer} onEnter={authenticate} fastRender={true}/>
      <Route name="users" path='/admin/users' component={UsersContainer} onEnter={authenticate} fastRender={true}/>

      <Route name="profile" path='/profile' component={Profile} onEnter={authenticate} fastRender={true}/>
      <Route name="company" path='/company' component={Company} onEnter={authenticate} fastRender={true}/>
      <Route name='produtos' path='/estoque' component={Products} onEnter={authenticate} fastRender={true}/>
      <Route name='relatorios' path='/relatorios' component={Reports} onEnter={authenticate} fastRender={true}/>


      <Route path="*" component={NotFound}/> */}
    </Route>
  </Router>, document.getElementById('react-root'));
}));
