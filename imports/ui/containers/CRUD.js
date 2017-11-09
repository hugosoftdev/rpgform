import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import users from '../../api/user/users';
import CRUD from '../components/CRUD';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('Users.findAll');
  if (subscription.ready()) {
    const Users = users.find().fetch();
    onData(null, { Users });
  }
};
export default composeWithTracker(composer)(CRUD);
