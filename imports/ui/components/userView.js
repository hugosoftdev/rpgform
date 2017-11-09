// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Modal, Button , FormControl} from 'react-bootstrap';
import { addUser } from '../../api/user/methods';

export default class CRUD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iAmBealtyfull: false,
      login: '',
      password: '',
      email: '',
    };
    this.addUser = this.addUser.bind(this);
  }

  // Callbacks
  addUser(){
    console.log("adding");
    addUser.call({login: this.state.login, password: this.state.password, email: this.state.email }, (err,res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }
  // Funtions

  render() {
    return (
      <div>
        <FormControl
          placeholder="Login"
          value={this.state.login}
          onChange={ e => (this.setState({ login: e.target.value }))}
        />
        <FormControl
          placeholder="Password"
          value={this.state.password}
          onChange={ e => (this.setState({ password: e.target.value }))}
        />
        <FormControl
          placeholder="E-mail"
          value={this.state.email}
          onChange={ e => (this.setState({ email: e.target.value }))}
        />
        <Button
          onClick = {this.addUser}>
          GO!!
        </Button>
        {this.props.Users.map((user) => {
          console.log(user);
          return (
            <div>
              {user.login}
            </div>
          );
        }
        )}


      </div>
    );
  }
}
CRUD.propTypes = {
  Users: PropTypes.array.isRequired,
};
