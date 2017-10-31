// /* eslint-disable no-param-reassign */
// /* eslint linebreak-style: ["error", "windows"]*/
//
//
// import { Accounts } from 'meteor/accounts-base';
// import { check } from 'meteor/check';
// import { Meteor } from 'meteor/meteor';
// import { Random } from 'meteor/random';
// import { sendSmsNewProfessional } from '../../../modules/sms-helper.js';
// import { sendSlackMesssage } from '../../../modules/server/slack-helpers';
// import checkUserPermission from '../../../modules/account.js';
// import { Companies } from '../../../api/companies/companies';
//
// Accounts.onCreateUser((options, user) => {
//   check(options.type, String);
//
//   // user.profile = options.profile || {};
//
//   user.name = options.name;
//   user.type = options.type;
//
//   if (options.type !== 'admin') {
//     check(options.companyId, String);
//
//
//     user.companyId = options.companyId;
//     user.recipient_id = options.recipient_id;
//
//     if (options.type === 'owner' || options.type === 'gestao_owner') {
//       user.name = options.name;
//       user.cellphone = options.cellphone;
//     } else if (options.type === 'professional') {
//       // Professionals come just from trusted client -
//       // Params are already validated on form
//       user.bank_account_id = options.bank_account_id;
//       user.name = options.name;
//       user.nickname = options.nickname;
//       user.password = options.password;
//       user.cellphone = options.cellphone;
//       user.document_type = options.document_type;
//       user.document_number = options.document_number;
//       user.bank_account = options.bank_account;
//       user.transfer_interval = options.transfer_interval;
//       user.transfer_day = options.transfer_day;
//       user.automatic_antecipation_day = options.automatic_antecipation_day || '15';
//       user.is_active = options.is_active;
//       user.is_assistant = options.is_assistant;
//       user.assistant_commission = options.assistant_commission;
//     } else if (options.type === 'custom-user') {
//       user.recipient_id = options.recipient_id;
//       user.available_features = {
//         services: options.available_features.services,
//         professionals: options.available_features.professionals,
//         cashier: options.available_features.cashier,
//         stock: options.available_features.stock,
//         transactions: options.available_features.transactions,
//         reports: options.available_features.reports,
//         terminal: options.available_features.terminal,
//       };
//     }
//   }
//
//
//   return user;
// });
//
// // Accounts.onEnrollmentLink((token, done) => {
// //   console.log(token, done);
// //   Accounts.resetPassword();
// // });
//
//
// if (Meteor.isServer) {
//   Meteor.methods({
//     createProfessional(professional) {
//       check(professional, Object);
//
//       const params = {
//         automaticAntecipationDay: professional.automatic_antecipation_day - 1,
//         recipientId: professional.recipient_id,
//         emailType: 'new_pagarme_recipient',
//       };
//
//       const userId = Accounts.createUser(professional);
//
//       // Default at pagarme is 2, dont need to email them at this case
//       if (params.automaticAntecipationDay !== 2) {
//         Meteor.call('sendEmail', params, (err) => {
//           if (err) {
//             sendSlackMesssage.call({
//               message: `${professional.companyId}: erro para mudar antecipação na pagarme \n${userId} - ${professional.name} (${professional.nickname}) \nErro: ${err}`,
//             });
//             throw new Meteor.Error('Falha no envio do email ( antecipação do professional): erro com email para adquirente');
//           }
//         });
//       }
//
//       sendSmsNewProfessional({
//         cellphone: professional.cellphone,
//         email: professional.email,
//         password: professional.password,
//         companyId: professional.companyId,
//       });
//       return userId;
//     },
//
//     createCustomUser(user) {
//       check(user, Object);
//       const userId = Accounts.createUser(user);
//       return userId;
//     },
//
//     updateProfessional(professional) {
//       check(professional, Object);
//
//       Meteor.users.update({ _id: professional._id }, { $set: {
//         name: professional.name,
//         nickname: professional.nickname,
//         cellphone: professional.cellphone,
//         document_type: professional.document_type,
//         document_number: professional.document_number,
//         bank_account: professional.bank_account,
//         transfer_enabled: professional.transfer_enabled,
//         transfer_interval: professional.transfer_interval,
//         transfer_day: professional.transfer_day,
//         bank_account_id: professional.bank_account_id,
//         recipient_id: professional.recipient_id,
//         is_active: professional.is_active,
//         is_assistant: professional.is_assistant,
//         assistant_commission: professional.assistant_commission,
//       } }, (error) => {
//         if (error) {
//           throw new Meteor.Error(error);
//         } else {
//           return;
//         }
//       });
//     },
//
//     removeProfessional(_id) {
//       check(_id, String);
//
//       Meteor.users.update({ _id }, {
//         $set: {
//           is_active: false,
//         },
//       }, (error) => {
//         if (error) {
//           throw new Meteor.Error(error);
//         } else {
//           return;
//         }
//       });
//     },
//
//     loginProfessional(_id) {
//       check(_id, String);
//       const loginToken = Random.secret();
//
//       Meteor.users.update({ _id }, { $set: {
//         app_login_token: loginToken,
//       } }, (error) => {
//         if (error) {
//           throw new Meteor.Error(error, 501);
//         }
//       });
//
//       return loginToken;
//     },
//
//
//     createOwner(owner) {
//       check(owner, Object);
//       check(owner.email, String);
//       check(owner.name, String);
//       check(owner.cellphone, String);
//       check(owner.companyId, String);
//       check(owner.recipient_id, String);
//       check(owner.type, String);
//       check(owner.automatic_antecipation_day, String);
//
//       const ownerId = Accounts.createUser(owner);
//       if (!ownerId) {
//         throw new Meteor.Error('Falha para criar dono do salão');
//       }
//
//       // Send email to PagaMe to tell recipientId about automaticAntecipationDay
//       // Here we subtract (- 1) because at pagarme automatic_antecipation_day says
//       // when the antecipation request will be made. It takes this amount plus 1 busy day
//       // for antecipation be transfered to account
//       const params = {
//         automaticAntecipationDay: owner.automatic_antecipation_day - 1,
//         recipientId: owner.recipient_id,
//         emailType: 'new_pagarme_recipient',
//       };
//
//       // Default at pagarme is 2, dont need to email them at this case
//       if (params.automaticAntecipationDay !== 2) {
//         Meteor.call('sendEmail', params, (err) => {
//           if (err) {
//             throw new Meteor.Error('Falha para criar dono do salão: erro com email para adquirente');
//           }
//         });
//       }
//       return ownerId;
//     },
//
//     searchForExistingProfessional(documentNumber, company_Id) {
//       check(documentNumber, String);
//       check(company_Id, String);
//       const professionals = Meteor.users.find({ companyId: company_Id, document_number: documentNumber }).fetch();
//       if (professionals.lenght > 0) {
//         throw new Meteor.Error('Profissional ja cadastrado', 'O número de documento inserido ja foi utilizado em outro cadastro');
//       } else {
//         return;
//       }
//     },
//
//     updateOwner(ownerName, ownerId) {
//       check(ownerName, String);
//       check(ownerId, String);
//
//       Meteor.users.update({ _id: ownerId }, { $set: {
//         name: ownerName,
//       } }, (err) => {
//         if (err) {
//           throw new Meteor.Error(err);
//         } else {
//           return;
//         }
//       });
//     },
//
//     createCashier(cashier) {
//       check(cashier, Object);
//       check(cashier.email, String);
//       check(cashier.companyId, String);
//       check(cashier.type, String);
//
//       const cashierId = Accounts.createUser(cashier);
//       if (!cashierId) {
//         throw new Meteor.Error('Falha para criar caixa do salão');
//       }
//
//       return cashierId;
//     },
//
//     impersonate(ownerId) {
//       check(ownerId, String);
//       if (!Meteor.users.findOne(ownerId)) {
//         throw new Meteor.Error(404, 'User not found');
//       }
//
//       if (!checkUserPermission('admin')) {
//         throw new Meteor.Error(403, 'Permission denied');
//       }
//       this.setUserId(ownerId);
//     },
//
//     setUserPassword(userId, newPassword) {
//       check(userId, String);
//       check(newPassword, String);
//       Accounts.setPassword(userId, newPassword, (error) => {
//         if (error) {
//           console.error(error);
//         } else {
//           return 'success';
//         }
//       });
//     },
//   });
// }
