import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Sheets from '../sheets';

Meteor.publish('Sheets.findByGroupId', function callback(params) {
  console.log(params);
  check(params, String);
  return Sheets.find({ group_id: params });
});

