import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Groups = new Mongo.Collection('Groups');
export default Groups;

// What we allow and deny on the client-side?
Groups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Groups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const groupSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    label: 'GroupName',
  },
  password: {
    type: String,
    label: 'Password',
  },
});

export const removeSchema = new SimpleSchema({
  _id: { type: String, optional: true },
});


Groups.attachSchema(groupSchema);
