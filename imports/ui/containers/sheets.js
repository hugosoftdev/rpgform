import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Sheets from '../../api/sheets/sheets';
import sheetsComponent from '../components/sheetsComponent';

const composer = (props, onData) => {
  console.log(props);
  console.log(props.params.groupId);
  const subscription = Meteor.subscribe('Sheets.findByGroupId', props.params.groupId);
  if (subscription.ready()) {
    const sheets = Sheets.find().fetch();
    console.log(sheets);
    onData(null, { sheets, groupId: props.params.groupId });
  }
};

const sheetsContainer = composeWithTracker(composer)(sheetsComponent);
export default sheetsContainer;
