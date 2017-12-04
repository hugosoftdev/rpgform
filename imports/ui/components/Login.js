  // /* eslint-disable max-len */
// /* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Grid, Row, Col, Modal, Button , FormControl} from 'react-bootstrap';
import { addGroup } from '../../api/groups/methods';
import SearchBar from '../components/SearchBar';
/**
 * Uma view onde os profissionais e o dono do salão conseguem ver detalhes sobre todas as transações feitas referentes a cada professional ou ao salão como um todo.
 * Caso seja um profissionais acessando essa view (sem ter id de dono ou de gestor), ele terá acesso somente aos detalhes das transações relacionadas a ele.
 */
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordModal: null,
      password: null,
    };
    this.handleChoice = this.handleChoice.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Callbacks
  handleChoice(selectedItem) {
    this.setState({ passwordModal: selectedItem });
  }

  handleLogin() {
    if (this.state.passwordModal.password === this.state.password) {
      Bert.alert(`Wellcome to ${this.state.passwordModal.name}`, 'success');
      this.closeModal();
      this.props.successCallback(this.state.passwordModal);
    } else {
      Bert.alert('Incorrect Password', 'danger');
    }
  }

  closeModal() {
    this.setState({ passwordModal: false, password: null });
  }

  // Funtions

  render() {
    return (
      <Grid fluid>
        <Row style={{ paddingTop: '15%' }}>
          <Col md={4} mdOffset={3} >
            <div>
              <img src='/dnd-logo.png' alt='logo' />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: '2%' }}>
            <div style={{ textAlign: 'center' }}>
              <SearchBar
                data = {this.props.groups}
                handleDataSelection = {this.handleChoice}
              />
            </div>
        </Row>
        {
          this.state.passwordModal ?
            <Modal show={this.state.passwordModal} onHide={this.closeModal}>
              <Modal.Header className='modal-header'>
                <Modal.Title>
                  <strong> {this.state.passwordModal.name.toUpperCase()} </strong>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ padding: '3%' }}>
                  <div>
                    <span> SECRET PASS FOR THIS GROUP </span>
                    <FormControl
                      autoFocus
                      type='password'
                      value={this.state.password}
                      onChange={
                        e => this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    className='default-button'
                    onClick={this.handleLogin}
                    >
                    ENTER
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          :
          ''
        }
      </Grid>
    );
  }
}

Login.propTypes = {
  groups: PropTypes.array.isRequired,
  successCallback: PropTypes.func.isRequired,
};
