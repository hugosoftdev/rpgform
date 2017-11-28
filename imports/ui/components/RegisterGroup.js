import React from 'react';
import { browserHistory } from 'react-router';
import {Modal, FormControl, Button} from 'react-bootstrap';

export default class RegisterGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreateGroup = this.handleCreateGroup.bind(this);

    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleCreateGroup() {
        console.log(this.state.name);
        console.log(this.state.password);
    }

    render() {
        console.log('chamou aqui');
        console.log(this.props.isOpen);
        return (
            <div>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                <Modal.Header>
                    <Modal.Title>
                        Cadastro de grupo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{ padding: '3%' }}>
                    <div>
                        <span> NOME DO GRUPO </span>
                            <FormControl
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            />
                    </div>
                </div> 
                <div style={{ padding: '3%' }}>
                    <div>
                        <span> SENHA DO GRUPO </span>
                            <FormControl
                            value = {this.state.password}
                            onChange = {this.handlePasswordChange}
                                />
                    </div>
                </div> 
                <div style={{ textAlign: 'center' }}>
                    <Button
                        className='default-button'
                        onClick={this.handleCreateGroup} >
                    Cadastrar
                  </Button>
                </div>
                </Modal.Body>
                </Modal>
            </div>
        );
    }
}


RegisterGroup.propTypes = {

};
