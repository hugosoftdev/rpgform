import React from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import LoginContainer from '../containers/Login';
import GroupContainer from '../containers/Group';
import { Row, Col, Modal, Button , FormControl} from 'react-bootstrap';
// import { addUser } from '../../api/user/methods';
import RegisterGroup from '../components/RegisterGroup';


export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedInn: false,
      login: '',
      password: '',
      email: '',
      registering: false,
      ng: angular.module('myApp', ['ngAnimate']),
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  handleLogin(group) {
    browserHistory.push(`/index/${group._id}`);
    this.setState({ loggedInn: true });
  }

  addUser() {
    console.log("adding");
    addUser.call({login: this.state.login, password: this.state.password}, (err,res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }


  render() {
    console.log(!this.props.params.groupId);
    return (
      <div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>
         {
          !this.props.params.groupId && !this.state.registering ?
            <LoginContainer
              successCallback={this.handleLogin}
            />
          :
          this.state.registering && !this.state.loggedInn ?
          <RegisterGroup
            closeModal = {() => this.setState({registering: false})}
            isOpen = {this.state.registering}
          />
          :
          <GroupContainer
            groupId = {this.props.params.groupId}
          />
        }

        {
          !this.props.params.groupId ?
        <center>
        <Button
        style ={{marginTop: '5em'}}
        bsStyle = 'success'
          onClick = {() => this.setState({registering: true})}>
         <strong> REGISTER GROUP </strong>
        </Button>
        </center>
        :
        ''
        }

        <body ng-app="ngAnimation">

        <h1>Hide the DIV: <input type="checkbox" ng-model="myCheck"/></h1>

        <div ng-hide="myCheck"><script>
        var 
        </script></div>

        </body>

      </div>

    );


  }

}



Index.propTypes = {
  params: PropTypes.object,
};
