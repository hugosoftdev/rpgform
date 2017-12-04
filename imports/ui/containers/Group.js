import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Groups from '../../api/groups/groups';
import Group from '../pages/Group';

const composer = ({ groupId }, onData) => {
  const subscription = Meteor.subscribe('Groups.findAll');
  if (subscription.ready()) {
    let group = Groups.find().fetch();
    console.log(group);
    group = group.filter(g => g._id === groupId)[0];
    onData(null, {
      group,
    });
  }
};
const GroupContainer = composeWithTracker(composer)(Group);
export default GroupContainer;
