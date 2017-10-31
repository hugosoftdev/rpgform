import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import moment from 'moment';

Meteor.publish('Users.findAll', () => Meteor.users.find({}, { fields: { name: 1, _id: 1, companyId: 1, nickname: 1, type: 1, available_features: 1, recipient_id: 1, password: 1, emails: 1 } }));

Meteor.publish('Users.findByTypeAndCompanyId', (type, _id) => {
  check(_id, String);
  check(type, String);

  if (type === 'owner' || type === 'gestao_owner') {
    return Meteor.users.find({ companyId: _id, type: { $ne: type } });
  }

  return Meteor.users.find({ companyId: _id, type });
});

Meteor.publish('Users.retrieveSmallerProfessionals', (companyId) => {
  check(companyId, String);
  return Meteor.users.find({ companyId, type: 'professional', is_active: true },
        { fields: { companyId: 1, type: 1, name: 1, nickname: 1, recipient_id: 1, document_number: 1 } });
});

Meteor.publish('Users.retrieveProfessionals', (_id) => {
  check(_id, String);
  return Meteor.users.find({ companyId: _id, type: 'professional' });
});

Meteor.publish('Users.retrieveActiveProfessionals', (_id) => {
  check(_id, String);
  return Meteor.users.find({ companyId: _id, type: 'professional', is_active: true });
});

Meteor.publish(null, function () {
  return Meteor.users.find({ _id: this.userId },
        { fields: { companyId: 1, type: 1, name: 1, recipient_id: 1, available_features: 1 } });
});

Meteor.publish('Users.returnProfile', (_id) => {
  check(_id, String);
  return (
    Meteor.users.find({ _id })
  );
});

Meteor.publish('Users.returnTransferData', (_id) => {
  check(_id, String);
  return Meteor.users.find({ _id }, { fields: { automatic_antecipation_day: 1, recipient_id: 1, transfer_interval: 1, transfer_day: 1, 'bank_account.bank_code': 1, max_installments: 1 } });
});
