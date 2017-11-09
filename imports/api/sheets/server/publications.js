import { Meteor } from 'meteor/meteor';
import Sheets from '../sheets';

Meteor.publish('Sheets.findByGroupId', (groupId) => Sheets.find({group_id: groupId}));
