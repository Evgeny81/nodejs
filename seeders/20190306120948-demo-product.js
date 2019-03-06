'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Supreme T-Shirt',
      brand: 'Supreme',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Supreme shorts',
      brand: 'Supreme',
      price: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
