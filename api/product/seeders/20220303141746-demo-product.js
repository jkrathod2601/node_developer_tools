'use strict';

module.exports = {
  async up ({ context: queryInterface }) {
    return queryInterface.bulkInsert('products', [{
      id: 1,
      name: 'Doe',
      price: 'example@example.com',
      qty:"20",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Doe',
      price: 'example@example.com',
      qty:"20",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down ({ context: queryInterface }) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
