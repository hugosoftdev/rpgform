import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Groups from '../../api/groups/groups';
import GroupSettings from '../components/GroupSettings';

const composer = ({ params }, onData) => {
    const groupId = params.groupId;
    const subscription = Meteor.subscribe('Groups.findAll');
    if (subscription.ready()) {
        let group = Groups.find().fetch();
        console.log(group);
        group = group.filter(g => g._id === groupId)[0];
        const password = group.password;
        onData(null, {
            password,
            groupId,
        });
    }
};
const GroupSettingsContainer = composeWithTracker(composer)(GroupSettings);
export default GroupSettingsContainer;
