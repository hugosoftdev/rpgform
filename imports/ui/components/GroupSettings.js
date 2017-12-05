import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Row, Grid, Button } from 'react-bootstrap';
import { addSheet } from '../../api/sheets/methods';
import SideBar from '../components/SideBar.js';

export default class GroupSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        return (
            <Grid fluid>
                <SideBar
                    groupId={this.props.params.groupId}
                />
            </Grid>
        );
    }
}



