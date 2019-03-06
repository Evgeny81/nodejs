'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    review: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  Reviews.associate = function(models) {
    // associations can be defined here
  };
  return Reviews;
};