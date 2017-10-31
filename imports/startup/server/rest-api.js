// /* eslint linebreak-style: ["error", "windows"] */
// import moment from 'moment';
// import Joi from 'joi';
// import { Meteor } from 'meteor/meteor';
// import { Restivus } from 'meteor/nimble:restivus';
// import { insertTransaction } from '../../api/transactions/methods';
// import { Companies } from '../../api/companies/companies';
// import { updateComandaStatus } from '../../api/comandas/methods';
// import { updatePinpadFee } from '../../api/companies/methods';
// import { Comandas } from '../../api/comandas/comandas';
// import Transactions from '../../api/transactions/transactions';
// import { sendReceipt } from '../../modules/server/api-helpers';
// import { getAntecipationFee, calcAmountWithFee, formatPaymentMethod } from '../../modules/calc-taxes';
// import { sendSlackMesssage } from '../../modules/server/slack-helpers';
//
// // Initialization
// moment.locale('pt-Br');
// const Api = new Restivus({ useDefaultAuth: true, prettyJson: true });
//
//     // Validacao dos parametros do POST utilizando o modulo JOI
// const transactionSchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   amount: Joi.string().required(),
//   // card_cvv: Joi.string().required(),
//   // card_expiration_date: Joi.string().required(),
//   // card_holder_name: Joi.string().required(),
//   // card_number: Joi.string().required(),
//   card_hash: Joi.string().required(),
//   comanda_id: Joi.string(),
//   company_cnpj: Joi.string().required(),
//   installments: Joi.string().required(),
//   payment_method: Joi.string().required(),
//   card_flag: Joi.string().required(),
//   recipients: Joi.array().items(Joi.object().keys({ document_number: Joi.string().min(11).max(14), amount: Joi.string() })),
//   return_receipt: Joi.boolean().default(false),
//   email_receipt: Joi.string().optional().concat(Joi.any().allow(null)),
//   sms_receipt: Joi.string().optional().concat(Joi.any().allow(null)),
// });
//
// const getTransactionSchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   transaction_id: Joi.string().required(),
// });
//
// const searchComandaSchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   company_cnpj: Joi.string().required(),
//   cpu: Joi.string().optional(),
// });
//
// const searchCompanySchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   company_cnpj: Joi.string().required(),
// });
//
// const comandaUpdateStatusScheme = Joi.object().keys({
//   api_key: Joi.string().required(),
//   comanda_id: Joi.string().required(),
//   payment_result: Joi.object().keys({
//     status: Joi.string().required(),
//     reason: Joi.string() }),
// });
//
// const refundTransactionSchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   transaction_id: Joi.string().required(),
// });
//
// const fecharComandaSchema = Joi.object().keys({
//   api_key: Joi.string().required(),
//   company_document_number: Joi.string().required(),
//   total_amount: Joi.string().required(),
//   payment_type: Joi.string().required(),
//   card_flag: Joi.string().required(),
//   installments: Joi.string().required(),
//   return_receipt: Joi.boolean().required(),
//   professionals: Joi.array().items(Joi.object().keys({
//     document_number: Joi.string().required(),
//     amount: Joi.string().required(),
//   })),
// });
//
//     // Generates: GET/POST on /api/v1/users, and GET/PUT/DELETE on /api/v1/users/:id
//     // for Meteor.users collection (works on any Mongo collection)
// Api.addCollection(Meteor.users);
//     // Rota para o post /api/transacao
//     // ==========================================================
// Api.addRoute('transacao', {
//       // ==========================================================
//   post: {
//     action() {
//           // Verificar chave API do POST antes de todo o resto
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         sendSlackMesssage.call({ message: 'invalid_api : chave de API invalida' });
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//
//           // Transaformar JSON com recebedores em Array de Objetos JavaScript
//       if (this.bodyParams.recipients == null) {
//         this.bodyParams.recipients = [];
//       }
//
//       // Se for uma transação de terminal, descomentar essa linha
//       // this.bodyParams.recipients = JSON.parse(this.bodyParams.recipients);
//
//       // Validação de todos parâmetros utilizando o Schema feito anteriormente com Joi
//       const validationError = Joi.validate(this.bodyParams, transactionSchema, err => err);
//       // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         sendSlackMesssage.call({ message: `invalid_parameter : ${validationError}` });
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//
//           // Variavel com Array de recebedores (Split Rules) conforme os argumentos
//       const recipientsParam = this.bodyParams.recipients;
//           // Array vazio para adicionar os recebedores com recipient_id
//       let recipients = [];
//           // Variavel com o Objeto salao a partir do CNPJ passado
//       const company = Companies.findOne({ document_number: this.bodyParams.company_cnpj });
//
//       if (!company) {
//         sendSlackMesssage.call({ message: 'invalid_company_cnpj : No company was found with this cnpj' });
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_company_cnpj',
//               message: 'No company was found with this cnpj',
//             },
//           },
//         };
//       }
//
//       const formattedPaymentMethod = formatPaymentMethod(this.bodyParams.payment_method, this.bodyParams.installments, this.bodyParams.card_flag);
//       const taxaRealAntecipacaoCompany = getAntecipationFee(company.taxes.rav, Number(this.bodyParams.installments), company.automatic_antecipation_day, formattedPaymentMethod)[0];
//       const taxaAntecipacaoAdquirerCompany = getAntecipationFee(company.taxes.rav, Number(this.bodyParams.installments), company.automatic_antecipation_day, formattedPaymentMethod)[1];
//
//       const companyId = company._id;  // Id do salão
//       const recipientIdOwner = company.recipient_id;          // Recipient_Id do dono do salao a partir do Objeto company
//       let totalAmountProfessional = 0;           // Variavel para armazenar o valor total de todos os profissionais recebedores
//       let totalAmount = 0; // Variavel para armazenar o valor total dos profissionais somado ao salão
//       let metadata = [];
//
//           /* Loop para adicionar os recebedores na Array vazia recipients com seus recipient_id  e valor recebido
//               (ja calculado com taxa da lapag) e somar o valor no total dos profissionais */
//       for (let i = 0; i < recipientsParam.length; i += 1) {
//         const professional = Meteor.users.findOne({ document_number: recipientsParam[i].document_number, companyId, is_active: true });
//         const taxaRealAntecipacaoProfessional = getAntecipationFee(company.taxes.rav, Number(this.bodyParams.installments), professional.automatic_antecipation_day || 15, formattedPaymentMethod)[0];
//         const taxaAntecipacaoAdquirerProfessional = getAntecipationFee(company.taxes.rav, Number(this.bodyParams.installments), professional.automatic_antecipation_day || 15, formattedPaymentMethod)[1];
//         let recipientAlreadyExists = false;
//         const laPagProfessionalsFee = (1 - ((1 - company.taxes[formattedPaymentMethod]) * (1 - taxaRealAntecipacaoProfessional)));
//
//             // ** Variaveis para metadados ** //
//         const amountCardFee = Math.round(recipientsParam[i].amount * company.taxes[formattedPaymentMethod]);
//         const amountAntecipationLaPag = Math.round((recipientsParam[i].amount - amountCardFee) * taxaRealAntecipacaoProfessional);
//         const amountAntecipationAdquirer = Math.round((recipientsParam[i].amount - amountCardFee - amountAntecipationLaPag) * taxaAntecipacaoAdquirerProfessional);
//             // ********* //
//
//         recipients = recipients.map((recipient) => {
//           if (recipient.recipient_id === professional.recipient_id) {
//             recipientAlreadyExists = true;
//             recipient.amount += Math.round(calcAmountWithFee(recipientsParam[i].amount, laPagProfessionalsFee));
//             metadata = metadata.map((data) => {
//               if (data.id === recipient.recipient_id) {
//                 data.amountCardFee += amountCardFee;
//                 data.amountAntecipationLaPag += amountAntecipationLaPag;
//                 data.amountAntecipationAdquirer += amountAntecipationAdquirer;
//                 data.amount += Math.round((recipientsParam[i].amount * (1 - company.taxes[formattedPaymentMethod]) * taxaRealAntecipacaoProfessional));
//               }
//               return data;
//             });
//           }
//           return recipient;
//         });
//         if (!recipientAlreadyExists) {
//           recipients.push({
//             recipient_id: professional.recipient_id,
//             amount: Math.round(calcAmountWithFee(recipientsParam[i].amount, laPagProfessionalsFee)),
//             charge_processing_fee: false,
//           });
//           metadata.push({
//             id: professional.recipient_id,
//             amountCardFee,
//             amountAntecipationLaPag,
//             amountAntecipationAdquirer,
//             discountedPinPad: 0,
//             smsFee: 0,
//             amount: Math.round((recipientsParam[i].amount * (1 - company.taxes[formattedPaymentMethod]) * taxaRealAntecipacaoProfessional)),
//           });
//         }
//         totalAmount += Math.round(calcAmountWithFee(recipientsParam[i].amount, laPagProfessionalsFee));
//         totalAmountProfessional += Number(recipientsParam[i].amount);
//       }
//           /*
//             =======
//             Owner Calcs
//             =======
//           */
//       const custoSms = 0;
//       let amountOwnerTotal = Number(this.bodyParams.amount) - Number(totalAmountProfessional);     // Variavel para armazenar o valor recebido pelo Dono do salao, a partir do valor total e do valor dos profissionais
//           /*
//            * Add Sms fee to owner
//            */
//
//           // if (this.bodyParams.sms_receipt) {
//           //   if (amountOwnerTotal > Meteor.settings.public.CUSTO_SMS) {
//           //     amountOwnerTotal -= Meteor.settings.public.CUSTO_SMS;
//           //     custoSms = Meteor.settings.public.CUSTO_SMS;
//           //   }
//           // }
//
//       let discountedPinPad = 0;
//       // changed-jean
//       const pinPadMonthlyFee = Number(company.current_pinpad_fee || company.pinpad_monthly_fee) || 0;
//
//           // -- Metadado -- //
//       const amountCardFee = Math.round(amountOwnerTotal * company.taxes[formattedPaymentMethod]);
//           // -------------- //
//
//       const originalPinPadValue = (company.current_pinpad_fee || company.pinpad_monthly_fee) || '0';
//
//           // Check for pinpad monthly fee and discount from owner. //
//           // changed-jean
//       let amountOwnerWithCardFee = amountOwnerTotal * (1 - company.taxes[formattedPaymentMethod]);
//       const amountOwnerWithCardFeeOriginal = amountOwnerWithCardFee;
//       const amountOwnerTotalOriginal = amountOwnerTotal;
//       if (pinPadMonthlyFee > 0 && amountOwnerWithCardFee > 0) {
//         if (amountOwnerWithCardFee > pinPadMonthlyFee) {
//           amountOwnerWithCardFee -= pinPadMonthlyFee;
//           amountOwnerTotal -= pinPadMonthlyFee;
//           discountedPinPad = pinPadMonthlyFee;
//           // TODO falar com Lelo (will it update old entries?)
//           company.current_pinpad_fee = '0';
//         } else {
//           // TODO falar com Lelo (will it update old entries?)
//           company.current_pinpad_fee = String(Math.round(pinPadMonthlyFee - (amountOwnerWithCardFee - 1)));
//           discountedPinPad = Math.round(amountOwnerWithCardFee) - 1;
//           amountOwnerWithCardFee = 1;
//           amountOwnerTotal = 1;
//         }
//       }
//
//           // ------------------ //
//
//           // Atualizar pinpad fee da company
//
//           // changed-jean
//       let hasUpdatedCompany = true;
//
//       let updatePinpadParams = {
//         company_id: companyId,
//         current_pinpad_fee: company.current_pinpad_fee || company.pinpad_monthly_fee,
//         monthly_pinpad: company.taxes.monthly_pinpad,
//       };
//
//       updatePinpadFee.call(updatePinpadParams, (error2) => {
//         if (error2) {
//           // body.status = 'fail';
//           // body.message = {};
//           // body.message.message = 'Houve um problema com o pagamento da maquininha. Entre em contato com a LaPag. (Código de erro: 403-PIN-PAD)';
//           hasUpdatedCompany = false;
//           amountOwnerWithCardFee = amountOwnerWithCardFeeOriginal;
//           amountOwnerTotal = amountOwnerTotalOriginal;
//           discountedPinPad = 0;
//           return error2;
//         }
//       });
//
//           // Calc owner amount(card fee -> current_pinpad_fee -> antecipation) //
//       let amountOwner = Math.round(amountOwnerWithCardFee * (1 - taxaRealAntecipacaoCompany));
//
//       if (amountOwner < 0) {
//         amountOwner = 0;
//       }
//
//       totalAmount += amountOwner;
//           // ----------------- //
//
//           // Adicionar dono do salao como recebedor na lista de recebedores.
//       recipients.push({
//         recipient_id: recipientIdOwner,
//         amount: amountOwner,
//         charge_processing_fee: false,
//       });
//
//           // ** Metadados ** //
//       const amountAntecipationLaPag = Math.round(amountOwnerWithCardFee * taxaRealAntecipacaoCompany);
//       const amountAntecipationAdquirer = Math.round((amountOwnerWithCardFee - amountAntecipationLaPag) * taxaAntecipacaoAdquirerCompany);
//
//       metadata.push({
//         id: recipientIdOwner,
//         amountCardFee,
//         amountAntecipationLaPag,
//         amountAntecipationAdquirer,
//         discountedPinPad,
//         smsFee: custoSms,
//             // Amount é a soma do valor de antecipação da pagarme com o desconto da pinpad.
//         amount: amountAntecipationLaPag + discountedPinPad + custoSms,
//       });
//           // ----------------- //
//
//           // Adicionar LaPag como recebedora na lista de recebedores
//           // Testar se os arredondamentos occoreram bem.,
//       const amountLapag = this.bodyParams.amount - totalAmount;
//       recipients.push({
//         recipient_id: Meteor.settings.public.LaPagRecipientId,
//         amount: amountLapag,
//         charge_processing_fee: true,
//       });
//       recipients.map((recipient) => {
//         recipient.amount = recipient.amount.toString();
//         return recipient;
//       });
//       metadata.map((data) => {
//         data.amount = data.amount.toString();
//         return data;
//       });
//           // Caso a lista de recebedores nao seja vazia (nao de erro), continuar a transacao
//       if (recipients) {
//         const transactionComanda = Comandas.findOne({ _id: this.bodyParams.comanda_id });
//
//             // Objeto vazio para todas as informacoes necessarias para a transacao no PagarMe
//         const transactionObject = {};
//             // Adicionar valor da transacao no objecto
//         transactionObject.amount = this.bodyParams.amount;
//         transactionObject.installments = this.bodyParams.installments;
//         transactionObject.metadata = {};
//         transactionObject.metadata.taxes = metadata;
//         transactionObject.metadata.comanda_id = this.bodyParams.comanda_id || null;
//         transactionObject.metadata.client_name = transactionComanda.client_name;
//         transactionObject.split_rules = recipients;
//         const blankSpace = ' ';
//         const fullCompanyName = blankSpace.concat(company.name);
//         transactionObject.soft_descriptor = fullCompanyName.substring(0, 12);
//             // Adicionar card_hard ao objeto de Transacao
//         transactionObject.card_hash = this.bodyParams.card_hash;
//         // transactionObject.card_number = this.bodyParams.card_number;
//         // transactionObject.card_holder_name = this.bodyParams.card_holder_name;
//         // transactionObject.card_expiration_date = this.bodyParams.card_expiration_date;
//         // transactionObject.card_cvv = this.bodyParams.card_cvv;
//
//         // Variavel vazia contendo o Resultado que sera retornado ao executavel
//         const body = {};
//
//         // Funcao para criar transacao na PagarMe utilizando o objeto transactionObject
//         Meteor.call('createTransaction', transactionObject, (error, result) => {
//           const transaction = result;
//
//           // This will update comanda status with payment result
//           const newComandaStatus = {
//             _id: transactionComanda._id,
//             status: 'payment_completed',
//           };
//
//           if (error) {
//             if (company.current_pinpad_fee) {
//               company.current_pinpad_fee = originalPinPadValue;
//             } else if (company.pinpad_monthly_fee) {
//               company.pinpad_monthly_fee = originalPinPadValue;
//             }
//
//
//             updatePinpadParams = {
//               company_id: companyId,
//               current_pinpad_fee: company.current_pinpad_fee || company.pinpad_monthly_fee,
//             };
//
//             if (hasUpdatedCompany) {
//               updatePinpadFee.call(updatePinpadParams, (error2) => {
//                 if (error2) {
//                   console.log(error2);
//                 }
//               });
//             }
//
//
//             body.status = 'fail';
//             body.message = error;
//
//             newComandaStatus.payment_result = {
//               status: 'fail',
//               reason: error.details || error.message || error,
//             };
//           } else {
//             body.status = 'success';
//             body.message = {};
//             body.message.message = transaction.status;
//             body.message.response_code = transaction.acquirer_response_code;
//             body.message.emv_data = transaction.card_emv_response || null;
//
//             // transaction needs to be an object, otherwise weird validation errors occur
//             insertTransaction.call({ transaction }, (errors, id) => {
//               if (errors) {
//                 console.log(errors);
//               } else {
//                 transaction.customTransactionId = id;
//               }
//             });
//
//             const returnReceipt = this.bodyParams.return_receipt;
//
//             // Send email receipt
//             if (returnReceipt === true && transaction.status === 'paid') {
//               const emailAddress = this.bodyParams.email_receipt;
//               const smsNumber = this.bodyParams.sms_receipt;
//               sendReceipt(company.name, transaction, emailAddress, smsNumber);
//             }
//
//             newComandaStatus.payment_result = {
//               status: 'success',
//               reason: 'Transação realizada com sucesso',
//             };
//           }
//
//
//           // Atualiza o status da comanda com o resultado da transação
//           updateComandaStatus.call(newComandaStatus, (updateError) => {
//             if (updateError) {
//               console.log('DANGER: comanda status update didnt work. Error below \n\n');
//               console.log(updateError);
//               sendSlackMesssage.call({ message: `Error while updating comanda status : ${JSON.stringify(error)}` });
//             }
//           });
//
//           return;
//         });
//         // Retornar resultado da operação
//         return { statusCode: 200, body };
//       }
//       return { statusCode: 400, reason: 'unexpected error at lapag' };
//     },
//   },
//   get: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       const validationError = Joi.validate(this.bodyParams, getTransactionSchema, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         id: 'WsWNWtKcsNSsDunzD',
//         status: 'paid',
//         authorization_code: '786920',
//         date_created: '2016-12-12T16:02:43.529Z',
//         amount: 30000,
//         installments: 1,
//         card_brand: 'master',
//         payment_method: 'credit',
//         recipients: [
//           {
//             document_number: '381021521',
//             amount: 1500,
//           },
//           {
//             document_number: '42813018201',
//             amount: 1500,
//           },
//         ],
//       };
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
//
//     // Rota para o post /api/comandas,
//     // ==========================================================
// Api.addRoute('comandas', {
//       // ==========================================================
//   post: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       const validationError = Joi.validate(this.bodyParams, searchComandaSchema, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//
//       const query = {
//         company_document_number: this.bodyParams.company_cnpj,
//         status: 'waiting_for_payment',
//       };
//
//       if (this.bodyParams.cpu) {
//         query.cpu = this.bodyParams.cpu;
//       }
//       const comanda = Comandas.findOne(query);
//
//       if (!comanda) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               message: 'No closed comandas have been found.',
//             },
//           },
//         };
//       }
//
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         status: '',
//         message: {
//           error: '',
//           message: '',
//         },
//       };
//
//       const updateComandaStatusParams = {
//         _id: comanda._id,
//         status: 'processing_payment',
//       };
//
//       updateComandaStatus.call(updateComandaStatusParams, (error) => {
//         if (error) {
//           body.status = 'fail';
//           body.message.error = error.reason;
//           body.message.message = error;
//           return;
//         }
//         body.status = 'success';
//         body.message.message = comanda;
//         body.message.error = undefined;
//         return;
//       });
//
//           // O que faz isso aqui? Será que ele está sendo usado?
//       comanda.amount *= 100;
//
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
//     // Rota para o post /api/comanda_status
//     // ==========================================================
// Api.addRoute('comanda_status', {
//       // ==========================================================
//   post: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       const validationError = Joi.validate(this.bodyParams, comandaUpdateStatusScheme, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//       const comanda = Comandas.findOne({ _id: this.bodyParams.comanda_id });
//
//       // Our production env sometimes dind't get any payment_result, and this caused comanda to be falsly paid
//       // This `if` fixes the problem
//       if (this.bodyParams.payment_result) {
//         comanda.payment_result = this.bodyParams.payment_result;
//       } else {
//         comanda.payment_result = {
//           status: 'fail',
//           reason: 'Operação não sucedida, por favor tente novamente',
//         };
//       }
//
//       comanda.status = 'payment_completed';
//       const updateComandaStatusParams = {
//         _id: comanda._id,
//         status: comanda.status,
//         payment_result: comanda.payment_result,
//       };
//
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         status: '',
//         message: {
//           error: '',
//           message: '',
//         },
//       };
//
//           // Atualiza a comanda para indicar que já foi paga
//       updateComandaStatus.call(updateComandaStatusParams, (error) => {
//         if (error) {
//           body.status = 'fail';
//           body.message.error = error.reason;
//           body.message.message = error;
//           return error;
//         }
//         body.status = 'success';
//         body.message.message = 'Comanda paga e atualizada!';
//         body.message.error = undefined;
//         return null;
//       });
//
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
//
//     // Rota para o post /api/search_company
//     // ==========================================================
// Api.addRoute('search_company', {
//       // ==========================================================
//   post: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       const validationError = Joi.validate(this.bodyParams, searchCompanySchema, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//
//       const company = Companies.findOne({ document_number: this.bodyParams.company_cnpj });
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         status: '',
//         message: {
//         },
//       };
//
//       if (!company) {
//         body.status = 'fail';
//         body.message.error = 'Salão não encontrado';
//         body.message.message = 'Nenhum salão foi encontrado';
//         return {
//           statusCode: 400,
//           body,
//         };
//       }
//
//       body.status = 'success';
//       body.message.company_name = company.name;
//       body.message.company_cnpj = company.document_number;
//
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
//     // Rota para o post /api/refund_transaction
//     // ==========================================================
// Api.addRoute('refund_transaction', {
//       // ==========================================================
//   post: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       const validationError = Joi.validate(this.bodyParams, refundTransactionSchema, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//
//       const transaction = Transactions.findOne({ _id: this.bodyParams.transaction_id });
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         status: '',
//         message: {
//         },
//       };
//
//       if (!transaction) {
//         body.status = 'fail';
//         body.message.error = 'transaction_not_found';
//         body.message.message = 'Nenhuma tranação foi encontrada';
//         return {
//           statusCode: 400,
//           body,
//         };
//       }
//       Meteor.call('refundTransaction', { transaction_id: transaction.transaction_id_pagarme }, (error, result) => {
//             // Caso aconteca algum erro, retornar fail com erro da PagarMe
//         if (error) {
//           body.status = 'fail';
//           body.message = error;
//           return error;
//         }
//             // Caso nao aconteca um erro, criar objeto de retorno para mensagem de sucesso com transaction_id da Transacao
//         body.status = 'success';
//         body.message = {};
//         body.message.message = result.status;
//         body.message.transaction_id = result._id;
//
//             // Adicionar transacao na Collection de transacoes com respectiva transaction_id
//         return result;
//       });
//
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
//     // Rota para o post /api/fechar_comanda
//     // NÃO SEI SE ESTAMOS USANDO!
//     // ==========================================================
// Api.addRoute('fechar_comanda', {
//       // ==========================================================
//   post: {
//     action() {
//       if (this.bodyParams.api_key !== Meteor.settings.private.apiLaPag) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_api',
//               message: 'chave de API invalida',
//             },
//           },
//         };
//       }
//       this.bodyParams.professionals = JSON.parse(this.bodyParams.professionals);
//       const validationError = Joi.validate(this.bodyParams, fecharComandaSchema, err => err);
//           // Caso occora algum erro de validacao, retornar fail com a mensagem contendo o parametro invalido
//       if (validationError) {
//         return {
//           statusCode: 400,
//           body: {
//             status: 'fail',
//             message: {
//               error: 'invalid_parameter',
//               message: `${validationError}`,
//             },
//           },
//         };
//       }
//           // Variavel vazia contendo o Resultado que sera retornado ao executavel
//       const body = {
//         status: 'sucess',
//         transaction_id: '7pZrTnWN4xDRRDYaZ',
//         error: null,
//         receipt: null,
//       };
//       const formattedString = 'SALÃO SANDBOX\n\nMastercard x1 - Código: #7pZrTnWN4xDRRDYaZ\nValor: R$$550,00\nData: $16/02/2017\nPago\nCliente Sandbox';
//       if (this.bodyParams.return_receipt !== 'false') {
//         body.receipt = formattedString;
//       }
//       return {
//         statusCode: 200,
//         body,
//       };
//     },
//   },
// });
