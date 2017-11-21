import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Groups, { groupSchema } from './groups';

export const addGroup = new ValidatedMethod({
  name: 'Groups.addGroup',
  validate: groupSchema.validator({ clean: true }),

  run({ name, password }) {
    return (Groups.insert({
      name,
      password,
    }));
  },
});


export const removeGroup = new ValidatedMethod({
  name: 'Groups.removeGroup',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),

  run({ id }) {
    return (Groups.remove({
      _id: id,
    }));
  },
});

