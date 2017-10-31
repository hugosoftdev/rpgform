import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import Services, { serviceSchema, removeSchema } from './services';

export const insertService = new ValidatedMethod({
  name: 'Services.insert',

  validate: serviceSchema.validator({ clean: true }),

  run({ name, price, category_id, default_comission, cost }) {
    if (!this.userId) {
      throw new Meteor.Error('Não Logado',
        'Você precisa estar logado para adicionar clientes');
    }

    const companyId = Meteor.user().companyId;

    if (!companyId) {
      throw new Meteor.Error('Não Identificado',
        'Seu salão não foi encontrado');
    }

    return Services.insert({
      name,
      price,
      category_id,
      default_comission,
      companyId,
      cost,
    });
  },
});

export const editServiceMethod = new ValidatedMethod({
  name: 'Services.update',
  validate: serviceSchema.validator({ clean: true }),
  run(service) {
    Services.update({ _id: service._id }, { $set: {
      name: service.name,
      price: service.price,
      default_comission: service.default_comission,
      category_id: service.category_id,
      available_professionals: service.available_professionals,
      cost: service.cost,
    } }, (error) => {
      if (error) {
        throw new Meteor.Error(error);
      } else {
        return;
      }
    });
  },
});

const editProfessionalSchema = new SimpleSchema({
  _id: { type: String },
  available_professionals: { type: [Object], blackbox: true },
});

export const editProfessionalFromService = new ValidatedMethod({
  name: 'Services.removeProfessional',
  validate: editProfessionalSchema.validator(),
  run({ _id, available_professionals }) {
    return Services.update({ _id }, { $set: {
      available_professionals,
    },
    });
  },
});

export const removeServiceMethod = new ValidatedMethod({
  name: 'Services.remove',
  validate: removeSchema.validator({ clean: true }),
  run({ _id }) {
    if (!Meteor.user()._id) {
      throw new Meteor.Error('Não Logado',
        'Você precisa estar logado para remover serviços');
    }
    Services.remove(_id);
  },
});
