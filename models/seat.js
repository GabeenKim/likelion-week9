const Sequelize = require('sequelize');

module.exports = class Seat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        seat_name: { type: Sequelize.STRING(50) },
        is_booked: { type: Sequelize.BOOLEAN },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Seat',
        tableName: 'Seats',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.Seat.belongsTo(db.Comp, {
      foriegnKey: { name: 'comp_id', type: Sequelize.INTEGER },
      targetKey: 'id',
    }); //comp의 자식
  }
};
