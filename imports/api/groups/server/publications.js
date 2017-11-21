import { Meteor } from 'meteor/meteor';
import Groups from '../groups';

Meteor.publish('Groups.findAll', () => Groups.find({}));
