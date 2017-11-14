import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Sheets from '../../api/sheets/sheets';
import sheetsComponent from '../components/sheetsComponent';

const composer = ({ params }, onData) => {
  console.log(params);
  const subscription = Meteor.subscribe('Sheets.findByGroupId', '2');
  if (subscription.ready()) {
    const sheets = Sheets.find().fetch();
    onData(null, { sheets });
  }
};

export default composeWithTracker(composer)(sheetsComponent);
