'use strict';
module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define('Options', {
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  Options.associate = function(models) {
    // associations can be defined here
  };
  return Options;
};