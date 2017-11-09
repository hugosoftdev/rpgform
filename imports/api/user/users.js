import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const users = new Mongo.Collection('Users');
export default users;

// What we allow and deny on the client-side?
users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const userSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  login: {
    type: String,
  },
  password: {
    type: String,
    label: 'Password',
  },
  email: {
    type: String,
    label: 'Email',
  },
});

export const removeSchema = new SimpleSchema({
  _id: { type: String, optional: true },
});


users.attachSchema(userSchema);
