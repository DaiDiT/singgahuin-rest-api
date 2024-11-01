'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kosan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kosan.hasMany(models.GambarKosan, {
        foreignKey: 'kosanId'
      })
    }
  }
  Kosan.init({
    nama: DataTypes.STRING,
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    tipe: {
      type: DataTypes.ENUM('Khusus Pria', 'Khusus Wanita', 'Campuran'),
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fasilitas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hargaKamar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    sisaKamar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Kosan',
  });
  return Kosan;
};