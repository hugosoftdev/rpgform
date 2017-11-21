import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Groups from '../../api/groups/groups';
import Login from '../components/Login';

const composer = ({ successCallback }, onData) => {
  const subscription = Meteor.subscribe('Groups.findAll');
  if (subscription.ready()) {
    const groups = Groups.find().fetch();
    onData(null, { 
      groups,
      successCallback,
    });
  }
};
const LoginContainer = composeWithTracker(composer)(Login);
export default LoginContainer;
