const database = require("../config/database");
const { DataTypes } = require("sequelize");

const Appointment = database.define("appointments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professionalid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Appointment.associate = (models) => {
  Appointment.belongsTo(models.Professional, { foreignKey: "professionalid" });
  Appointment.belongsTo(models.User, { foreignKey: "clientid" });
};

module.exports = Appointment;
