'use strict';

module.exports = {
  async up ({ context: queryInterface }) {
    return queryInterface.bulkInsert('cars', [{
      name: 'Doe',
      price:"20000",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Doe',
      price:"20000",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down ({ context: queryInterface }) {
    return queryInterface.bulkDelete('cars', null, {});
  }
};
