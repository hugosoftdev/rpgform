import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Nav, MenuItem, Navbar, NavDropdown } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
//
// const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const renderNavigation = (hasUser) => {
  if (!hasUser) {
    return null;
  }

  return (

    <Navbar collapseOnSelect>

      <Navbar.Toggle />
      <Navbar.Header>
        <Navbar.Brand>
          {/* <Link to="/"><img src='/logo.svg' alt='logo'className='logo'/></Link> */}
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        {/* <Nav className="account-info hidden-md hidden-lg">
          <NavDropdown noCaret={true} eventKey={3} title='' id="basic-nav-dropdown" >
            <LinkContainer to={profileView}>
              <MenuItem eventKey={3.2} >Perfil</MenuItem>
            </LinkContainer>
            <MenuItem eventKey={3.1} onClick={handleLogout}>Sair</MenuItem>
          </NavDropdown>
        </Nav> */}
      </Navbar.Collapse>

      <Nav className="account-info visible-md visible-lg">
        {/* <NavDropdown noCaret={true} eventKey={3} title='' id="basic-nav-dropdown">

         <LinkContainer to={profileView}>
          <MenuItem eventKey={3.2} >Perfil</MenuItem>
         </LinkContainer>
          <MenuItem eventKey={3.1} onClick={handleLogout}>Sair</MenuItem>
        </NavDropdown> */}
      </Nav>
    </Navbar>

  );
};

const AppNavigation = ({ hasUser }) => (renderNavigation(hasUser));

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
