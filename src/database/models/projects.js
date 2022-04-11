"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      projects.belongsTo(models.users, {
        as: "Project Manager",
        foreignKey: "projectManagerId",
      });
      projects.belongsTo(models.users, {
        as: "Contributor",
        foreignKey:"contributorId",
      });
    }
  }
  projects.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      projectManagerId: DataTypes.INTEGER,
      contributorId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "projects",
    }
  );
  return projects;
};
