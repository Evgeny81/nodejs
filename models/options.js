'use strict';
module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define('Options', {
    color: DataTypes.STRING,
    size: DataTypes.STRING
  }, {});
  Options.associate = function(models) {
    models.Options.belongsTo(models.Products, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Options;
};
