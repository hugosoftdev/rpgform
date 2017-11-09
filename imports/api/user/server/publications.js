import { Meteor } from 'meteor/meteor';
import users from '../users';

Meteor.publish('Users.findAll', () => users.find({}));
