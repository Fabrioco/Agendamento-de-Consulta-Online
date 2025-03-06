const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Schedule = database.define(
  "schedules",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    professionalid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starttime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endtime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Schedule.associate = (models) => {
  Schedule.belongsTo(models.Professional, { foreignKey: "professionalid" });
};

module.exports = Schedule;
