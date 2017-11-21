import React from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import LoginContainer from '../containers/Login';
import GroupPage from '../pages/Group';


export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedInn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(group) {
    browserHistory.push(`/index/${group._id}`);
    this.setState({ loggedInn: true });
  }

  render() {
    return (
      <div>
        {
          !this.props.params.groupId ?
            <LoginContainer
              successCallback={this.handleLogin}
            />
          :
          <GroupPage/>
        }

      </div>
    );
  }
}


Index.propTypes = {
  params: PropTypes.object,
};
