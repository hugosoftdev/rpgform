import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Groups, { groupSchema } from './groups';

export const addGroup = new ValidatedMethod({
  name: 'Groups.addGroup',
  validate: groupSchema.validator({ clean: true }),

  run(group) {
    return (Groups.insert(group));
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

export const updatePassword = new ValidatedMethod({
  name: 'Groups.updatePassword',
  validate: new SimpleSchema({
    _id: { type: String },
    password: { type: String },
  }).validator(),

  run({ _id, password }) {
    Groups.update({ _id }, {
      $set: {
        password,
      },
    }, (error) => {
      if (error) {
        console.log('deu erro vey');
      }
    });
  },
});

