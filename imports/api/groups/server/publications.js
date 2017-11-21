import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import Groups from '../groups';

Meteor.publish('Groups.findAll', () => Groups.find({}));

Meteor.publish('Groups.findById', function callback(params) {
  console.log(params);
  check(params, Object);
  return Groups.find({ _id: { _str: params.groupId } });
});
