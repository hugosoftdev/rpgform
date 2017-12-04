import React from 'react';
import { browserHistory } from 'react-router';
import SideBar from '../components/SideBar.js';

export default class Group extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {
        return (
            <div>
            {console.log(this.props)}
                <SideBar
                    groupId = {this.props.group._id}
                />
            </div>
        );
    }
}


Group.propTypes = {

};
