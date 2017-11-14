import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import users, { userSchema } from './users';

export const addUser = new ValidatedMethod({
  name: 'users.addUser',
  validate: userSchema.validator({ clean: true }),

  run({ login, password, email }) {
    console.log("I'm running");
    console.log(login);
    return (users.insert({
      login,
      password,
      email,
    }));
  },
});


export const removeUser = new ValidatedMethod({
  name: 'users.removeUser',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),

  run({ id }) {
    console.log("I'm deleting");
    console.log(id);
    return (users.remove({
      _id: id,
    }));
  },
});

