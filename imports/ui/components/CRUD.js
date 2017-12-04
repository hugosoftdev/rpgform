// /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col, Modal, Button , FormControl} from 'react-bootstrap';
import { addUser } from '../../api/user/methods';
/**
 * Uma view onde os profissionais e o dono do salão conseguem ver detalhes sobre todas as transações feitas referentes a cada professional ou ao salão como um todo.
 * Caso seja um profissionais acessando essa view (sem ter id de dono ou de gestor), ele terá acesso somente aos detalhes das transações relacionadas a ele.
 */
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
  addUser() {
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
        </Button>1
        {this.props.Users.map((user) => {
          {/* console.log(user); */}
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
