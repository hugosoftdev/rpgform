import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

export const updateUserAvailableFeatures = new ValidatedMethod({
  name: 'user.updateUser',
  validate: new SimpleSchema({
    _id: { type: String },
    available_features: { type: Object },
    'available_features.services': { type: Object, optional: true },
    'available_features.services.label': { type: String },
    'available_features.services.is_active': { type: Boolean },
    'available_features.services.name': { type: String },
    'available_features.professionals.label': { type: String },
    'available_features.professionals.is_active': { type: Boolean },
    'available_features.professionals.name': { type: String },
    'available_features.professionals': { type: Object, optional: true },
    'available_features.cashier': { type: Object, optional: true },
    'available_features.cashier.label': { type: String },
    'available_features.cashier.is_active': { type: Boolean },
    'available_features.cashier.name': { type: String },
    'available_features.stock': { type: Object, optional: true },
    'available_features.stock.label': { type: String },
    'available_features.stock.is_active': { type: Boolean },
    'available_features.stock.name': { type: String },
    'available_features.transactions': { type: Object, optional: true },
    'available_features.transactions.label': { type: String },
    'available_features.transactions.is_active': { type: Boolean },
    'available_features.transactions.name': { type: String },
    'available_features.terminal.label': { type: String },
    'available_features.terminal.is_active': { type: Boolean },
    'available_features.terminal.name': { type: String },
    'available_features.terminal': { type: Object, optional: true },
    'available_features.reports': { type: Object, optional: true },
    'available_features.reports.label': { type: String },
    'available_features.reports.is_active': { type: Boolean },
    'available_features.reports.name': { type: String },
  }).validator(),

  run({ _id, available_features }) {
    const companyId = Meteor.user().companyId;

    if (!companyId) {
      throw new Meteor.Error('Não Identificado',
        'Seu salão não foi encontrado');
    }
    Meteor.users.update({ _id }, {
      $set: {
        available_features,
      },
    });
  },
});
