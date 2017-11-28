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
    console.log(this.props.group);
    return (
            <div>
                <SideBar/>
            </div>
    );
  }
}


Group.propTypes = {
  group: React.PropTypes.object,
};
