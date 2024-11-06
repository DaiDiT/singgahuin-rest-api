'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kosans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: true
      },
      tipe: {
        type: Sequelize.ENUM('Khusus Pria', 'Khusus Wanita', 'Campuran'),
        allowNull: false
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fasilitas: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      hargaKamar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      kamarTersedia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      kontak: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kosans');
  }
};