// import { Meteor } from 'meteor/meteor';
// import { SyncedCron } from 'meteor/percolate:synced-cron';
// import moment from 'moment';
// import { Companies } from '../../api/companies/companies';
// import { updatePinpadFee } from '../../api/companies/methods';
//
// function recipientsToWithdrawToday() {
//   const todayNumber = Number(moment().format('D'));
//   const weekDay = String(moment().day());
//
//   let biWeeklyQuery = [{ 'transfer_day.firstDraw': todayNumber }, { 'transfer_day.secondDraw': todayNumber }];
//
//   if (weekDay === '0' || weekDay === '6') {
//     // If it's sunday or saturday, we don't want to transfer
//     biWeeklyQuery = [];
//   } else if (weekDay === '1') {
//     // If is monday, query for users who should had transfered on saturday/sunday
//     biWeeklyQuery.push({ 'transfer_day.firstDraw': todayNumber - 1 });
//     biWeeklyQuery.push({ 'transfer_day.secondDraw': todayNumber - 1 });
//     biWeeklyQuery.push({ 'transfer_day.firstDraw': todayNumber - 2 });
//     biWeeklyQuery.push({ 'transfer_day.secondDraw': todayNumber - 2 });
//   }
//
//   const users = Meteor.users.find({
//     $or: biWeeklyQuery.concat([{ transfer_interval: 'daily' }, { transfer_day: weekDay }]),
//   }).fetch();
//
//   const recipients = users.map((user) => {
//     const formattedUser = {
//       recipient_id: user.recipient_id,
//       isBradesco: user.bank_account.bank_code === '237',
//     };
//     return formattedUser;
//   });
//   const transferResult = [];
//
//   for (let i = 0; i < recipients.length; i += 1) {
//     Meteor.call('transferRecipientFunds', recipients[i], (err, result) => {
//       if (err) {
//         transferResult.push({
//           type: 'transfer',
//           recipient_id: recipients[i],
//           status: 'fail',
//         });
//       } else {
//         transferResult.push({
//           type: 'transfer',
//           recipient_id: recipients[i],
//           status: result.status,
//           amount: result.amount,
//         });
//       }
//     });
//   }
//   return transferResult;
// }
//
// function chargeMonthlyPinpadFee() {
//   const today = (new Date()).getDate();
//
//   const companies = Companies.find().fetch().map((companyParam) => {
//     const company = companyParam;
//
//     if (!company.pinpad_day) {
//       company.pinpad_day = 1;
//     }
//
//     if (Number(company.pinpad_day) === Number(today)) {
//       const currentFee = Number(company.current_pinpad_fee || company.pinpad_monthly_fee || 0);
//       let newFee;
//
//       if (!isNaN(company.taxes.monthly_pinpad)) { // this is true if newMonthlyPinpad is defined and is a number
//         newFee = String(Math.round(currentFee + company.taxes.monthly_pinpad));
//       } else {
//         console.log('Important error at cron-job: shouldnt fall in this else statement');
//         company.taxes.monthly_pinpad = Math.round((Meteor.settings.public.ALUGUEL_PIN_PAD));
//         newFee = String(Math.round((currentFee + Meteor.settings.public.ALUGUEL_PIN_PAD)));
//       }
//
//       return ({
//         company_id: company._id,
//         current_pinpad_fee: newFee,
//         monthly_pinpad: company.taxes.monthly_pinpad,
//       });
//     }
//
//     return ({
//       company_id: company._id,
//       current_pinpad_fee: company.current_pinpad_fee,
//       monthly_pinpad: company.taxes.monthly_pinpad,
//     });
//   });
//
//   const jobResult = []; // changed-jean
//   for (let i = 0; i < companies.length; i += 1) {
//     updatePinpadFee.call(companies[i], (err) => {
//       if (err) {
//         jobResult.push({
//           type: 'pinpad_fee',
//           company_id: companies[i].company_id,
//           monthly_fee: companies[i].current_pinpad_fee,
//           status: 'fail',
//           warning: 'not updating company pinpad fee',
//           fail_reason: err,
//         });
//       } else {
//         jobResult.push({
//           type: 'pinpad_fee',
//           company_id: companies[i].company_id,
//           monthly_fee: companies[i].current_pinpad_fee,
//           status: 'success',
//         });
//       }
//     });
//   }
//   return jobResult;
// }
//
// SyncedCron.add({
//   name: 'Automatic Withdraw Cronjob',
//   schedule(parser) {
//     // parser is a later.parse object
//     return parser.text('at 9:30 am');
//   },
//   job() {
//     const result = recipientsToWithdrawToday();
//     result.called_from_epic_droplet = Meteor.settings.public.is_epic_droplet;
//     return result;
//   },
// });
//
// SyncedCron.add({
//   name: 'Pinpad Monthly Fee Reset',
//   schedule(parser) {
//     // parser is a later.parse object
//     return parser.text('at 9:25 am');
//   },
//   job() {
//     const result = chargeMonthlyPinpadFee();
//     return result;
//   },
// });
//
// SyncedCron.start();
