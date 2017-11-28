import React from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import LoginContainer from '../containers/Login';
import GroupContainer from '../containers/Group';
import SheetForm from '../components/CharSheetForm';


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
    console.log(this.props.params.groupId);
    return (
      <div>
        {
          !this.props.params.groupId ?
            <LoginContainer
              successCallback={this.handleLogin}
            />
          :
          <GroupContainer
            groupId = {this.props.params.groupId}
          />
        }
        <SheetForm
          groupId = {'TESTE ID'}
        />
      </div>
    );
  }
}


Index.propTypes = {
  params: PropTypes.object,
};
