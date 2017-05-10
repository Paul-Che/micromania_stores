// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { helpers } from 'faker';
import { Stores } from '../imports/collections/stores';

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Stores.find({}).count();

  if (!numberRecords) {
    // Generate some data...
    _.times(30, () => {
      const { name, address } = helpers.createCard();

      Stores.insert({
        name, address
      });
    });
  }

  Meteor.publish('stores', () => Stores.find({}));
});
