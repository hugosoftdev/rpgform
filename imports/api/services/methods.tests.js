/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import './methods.js'; // import all the methods that will be tested
import Services from './services.js';

if (Meteor.isServer) {
  describe('Services', function () {
    describe('methods', function () {
     // Checks if fake user was successfully created
      const isDefined = function (target) {
        assert.isNotNull(target, 'unexpected null value');
        assert.isDefined(target, 'unexpected undefined value');

        if (typeof target === 'string') {
          assert.notEqual(target.trim(), '');
        }
      };


     // Saves the original meteor user function
      let meteorUserOriginal = null;

     // Our test user id and companyId
      let userId = null;
      let companyId = null;

      let thisContext = null;

      beforeEach(() => {
        resetDatabase();

       // Save the original meteor user function
        meteorUserOriginal = Meteor.user;
       // Generate a fake user
        userId = Accounts.createUser({ username: Random.id() });
        companyId = Random.id(5);
        isDefined(userId);

       // Set up a fake thisContext that looks like what the method expects
       // This allows us to use this.userId to return the actual test user id
        thisContext = { userId };

       // Mock the Meteor.user() function, so that it always returns our new created user
       // Fakes Meteor.user() to return test user
        Meteor.user = function () {
          const users = Meteor.users.find({ _id: userId }).fetch();
          if (!users || users.length > 1) {
            throw new Error('Meteor.user() mock cannot find user by userId.');
          }
          users[0].companyId = companyId;
          return users[0];
        };
      });

      afterEach(() => {
       // remove the user in the db, restore Meteor.user() func and resets userId
        Meteor.users.remove(userId);
        Meteor.user = meteorUserOriginal;
        userId = null;
      });

      it('can insert service', () => {
        const insertServiceMethod = Meteor.server.method_handlers['Services.insert'];

        // Creates service
        const params = {
          name: 'Unhas do Teste',
          price: 50,
          category_id: Random.id(5),
          default_comission: 50,
        };

        let service = insertServiceMethod.apply(thisContext, [params]);
        service = { _id: service };

        // Assert service insertion
        const getService = Services.findOne(service);
        assert.strictEqual(getService.name, 'Unhas do Teste');
      });

      it('can delete service', () => {
        const removeService = Meteor.server.method_handlers['Services.remove'];

        let service = Factory.create('service');
        service = { _id: service._id };

        removeService.apply(thisContext, [service]);
        const getService = Services.findOne(service);
        assert.strictEqual(getService, undefined);
      });

      it('can update service', () => {
        const updateService = Meteor.server.method_handlers['Services.update'];

        const service = Factory.create('service');
        const updatedService = {
          _id: service._id,
          name: 'Updated Service',
          price: service.price + 10,
          default_comission: service.default_comission,
          category_id: service.category_id,
          available_professionals: service.available_professionals,
          cost: service.cost,
        };

        updateService.apply(thisContext, [updatedService]);

        // Set a timeout, so Meteor has time to update the data
        const timeout = new Promise((resolve) => {
          setTimeout(function () {
            resolve();
          }, 10);
        });

        // After the timeout, assert the result
        return timeout.then(() => {
          const getService = Services.findOne(service._id);
          assert.strictEqual(getService.price, service.price + 10);
        });
      });
    });
  });
}
