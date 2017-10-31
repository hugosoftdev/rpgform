import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/AppNavigation.js';

const App = ({ children }) => (
  <div id='root'>
    <AppNavigation />
    <Grid fluid>
      { children }
    </Grid>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
