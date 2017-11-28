import React from 'react';
import { browserHistory } from 'react-router';
import {Modal, FormControl, Button} from 'react-bootstrap';

export default class RegisterGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

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
                    <FormControl/>
                    <Button>
                        cadastrar
                    </Button>
                </Modal.Body>
                </Modal>
            </div>
        );
    }
}


RegisterGroup.propTypes = {

};
