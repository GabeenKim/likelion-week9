const Sequelize = require("sequelize");

module.exports = class Train extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        train_grade_name: { type: Sequelize.STRING(50) },
        dep_pland_time: { type: Sequelize.DATE },
        arr_pland_time: { type: Sequelize.DATE },
        dep_place_name: { type: Sequelize.STRING(50) },
        arr_place_name: { type: Sequelize.STRING(50) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Train",
        tableName: "Trains",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Train.hasMany(db.Comp, {
      foriegnKey: { name: "train_id", type: Sequelize.INTEGER },
      targetKey: "id",
    });
  }
};
