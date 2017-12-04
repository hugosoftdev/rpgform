import React from 'react';
import { browserHistory } from 'react-router';
import {Modal, FormControl, Button} from 'react-bootstrap';
import { addGroup } from '../../api/groups/methods';

export default class RegisterGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.addGroup = this.addGroup.bind(this);

    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    addGroup() { 
        const group = {
            type: 'master',
            name: this.state.name,
            password: this.state.password,
        }
        console.log(this.state.name);
        console.log(this.state.password);
        addGroup.call(group, (err, res) => {
        if (err) {
            console.log(err);
            }
        else {
            console.log(res);
            this.props.closeModal();
      }
    })
    }




    render() {
        console.log('chamou aqui');
        console.log(this.props.isOpen);
        return (
            <div>
                <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
                <Modal.Header>
                    <Modal.Title>
                        CREATE YOUR GROUP
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{ padding: '3%' }}>
                    <div>
                        <span> GROUP NAME </span>
                            <FormControl
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            />
                    </div>
                </div> 
                <div style={{ padding: '3%' }}>
                    <div>
                        <span> GROUP SECRET PASS </span>
                            <FormControl
                            value = {this.state.password}
                            onChange = {this.handlePasswordChange}
                                />
                    </div>
                </div> 
                <div style={{ textAlign: 'center' }}>
                    <Button
                        className='default-button'
                        onClick={this.addGroup} >
                    REGISTER
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
