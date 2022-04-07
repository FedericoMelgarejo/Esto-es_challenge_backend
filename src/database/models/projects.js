"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projects.belongsToMany(models.User, {
        as: "contributors",
        through: "UserProject",
      });
      Projects.belongsTo(models.User, {
        as: "PM",
        foreignKey: "fk_project_manager_id",
      });
    }
  }
  Projects.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.INTEGER, //1 = active, 0 = inactive
      fk_project_manager_id: DataTypes.STRING,
      cretedAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Projects",
    }
  );
  return Projects;
};
