import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Sheets = new Mongo.Collection('Sheets');
export default Sheets;

// What we allow and deny on the client-side?
Sheets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Sheets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const sheetSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  type: {
    type: String,
    //colocor optional values
  },
  group_id: {
    type: String,
  },
  player_name: {
    type: String,
  },
  char_name: {
    type: String,
  },

});

export const removeSchema = new SimpleSchema({
  _id: { type: String, optional: true },
});


Sheets.attachSchema(sheetSchema);
