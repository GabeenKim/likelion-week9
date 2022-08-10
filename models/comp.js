const Sequelize = require("sequelize");

module.exports = class Comp extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comp_name: { type: Sequelize.STRING(50) },
        comp_type: { type: Sequelize.STRING(50) },
        train_id: { type: Sequelize.STRING(10) },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Comp",
        tableName: "Comps",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.Comp.belongsTo(db.Train, {
      foriegnKey: { name: "train_id", type: Sequelize.INTEGER },
      targetKey: "id",
    }); //train 자식
    db.Comp.hasMany(db.Seat, {
      foriegnKey: { name: "comp_id", type: Sequelize.INTEGER },
      targetKey: "id",
    }); //seat의 부모
  }
};
