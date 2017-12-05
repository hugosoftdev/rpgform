import React from 'react';
import { browserHistory } from 'react-router';
import SideBar from '../components/SideBar.js';

export default class Group extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    redirect() {
        return browserHistory.push(`/sheets/${this.props.group._id}`);
    }

    render() {
        return (
            <div>
                <SideBar
                    groupId = {this.props.group._id}
                />
                {this.redirect()}
            </div>

        );
    }
}


Group.propTypes = {

};
