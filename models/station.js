const Sequelize = require('sequelize');

module.exports = class Station extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        station_name: { type: Sequelize.STRING(50) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Station',
        tableName: 'Stations',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
