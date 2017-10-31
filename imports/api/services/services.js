import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Services = new Mongo.Collection('Services');
export default Services;

// What we allow and deny on the client-side?
Services.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Services.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const serviceSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  companyId: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    label: 'Service Name',
  },
  price: {
    type: Number,
    decimal: true,
    label: 'Service Price',
  },
  category_id: {
    type: String,
    label: 'Service Category',
  },
  default_comission: {
    type: Number,
    decimal: true,
    label: 'Service Default Comission',
  },
  available_professionals: {
    type: [Object],
    defaultValue: [],
  },
  'available_professionals.$.cpf': {
    type: String,
  },
  'available_professionals.$.commission': {
    type: String,
  },
  cost: {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 0,
  },
});

export const removeSchema = new SimpleSchema({
  _id: { type: String, optional: true },
});


Services.attachSchema(serviceSchema);


Factory.define('service', Services, {
  name: 'Service Title',
  price: 400,
  companyId: 'companyId',
  category_id: '32dk23d0dkwq', // Factory.get('category'),
  default_comission: 50,
});
