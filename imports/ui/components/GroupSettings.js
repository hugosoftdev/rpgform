import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { PropTypes } from 'prop-types';
import { Col, Row, Grid, Button, FormControl } from 'react-bootstrap';
import { addSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';
import {updatePassword} from '../../api/groups/methods';

export default class GroupSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleNew = this.handleNew.bind(this);
        this.handleOld = this.handleOld.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    handleNew(e) {
        this.setState({new:e.target.value});
    }

    handleOld(e) {
        this.setState({old: e.target.value});
    }

    updatePassword() {

        if(this.state.old !== this.props.password) {
            Bert.alert('Passwords doesnt match', 'danger');
        } else {
            updatePassword.call({ _id: this.props.groupId, password: this.state.new }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    Bert.alert('Password updated', 'success');
                    this.setState({ old: null, new: null });
                }
            });
        }
    }


    render() {
        return (
            <Grid fluid>
                <SideBar
                    groupId={this.props.groupId}
                />
                <div className='change-password'>
                    <div style={{margin:'40px'}}>
                        <span style={{
                            color: 'white',
                            fontSize: '1em'
                        }}> OLD PASSWORD </span>
                        <FormControl
                            value = {this.state.old}
                            onChange = {this.handleOld}
                        />
                    </div>
                    <div style={{ margin: '40px' }}>
                        <span style={{
                            color: 'white',
                            fontSize:'1em'
                        }}> NEW PASSWORD </span>
                        <FormControl
                            value= {this.state.new}
                            onChange = {this.handleNew}
                        />
                    </div>
                    <div style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }
                    }>
                        <Button
                            bsStyle = 'success'
                            onClick = {this.updatePassword}
                        >
                            UPDATE PASSWORD
                        </Button>
                    </div>
                </div>
            </Grid>
        );
    }
}

GroupSettings.propTypes = {
    password: React.PropTypes.string,
    groupId: React.PropTypes.string,
};
