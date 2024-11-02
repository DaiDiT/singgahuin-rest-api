'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FotoKosan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FotoKosan.belongsTo(models.Kosan, {
        foreignKey: 'kosanId'
      })
    }
  }
  FotoKosan.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    keterangan: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FotoKosan',
  });
  return FotoKosan;
};