/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Services from '../services';

Meteor.publish('Services.findByCompanyId', function callback(_id) {
  check(_id, String);
  return Services.find({ companyId: _id });
});
