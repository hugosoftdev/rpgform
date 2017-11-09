import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Sheets from '../../api/sheets/sheets';
import CRUD from '../components/CRUD';

const composer = ({ params }, onData) => {
    const subscription = Meteor.subscribe('Sheets.findByGroupId',params.groupId);
    if (subscription.ready()) {
        const sheets = Sheets.find().fetch();
        onData(null, { sheets });
    }
};
export default composeWithTracker(composer)(sheetsComponent);
