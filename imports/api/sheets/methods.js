import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Sheets, { sheetSchema } from './sheets';

export const addSheet = new ValidatedMethod({
  name: 'sheets.addSheet',
  validate: sheetSchema.validator({ clean: true }),

  run(sheet) {
    return (Sheets.insert(sheet));
  },
});


export const removeSheet = new ValidatedMethod({
  name: 'Sheets.removeSheet',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),

  run({ id }) {
    return (Sheets.remove({
      _id: id,
    }));
  },
});

