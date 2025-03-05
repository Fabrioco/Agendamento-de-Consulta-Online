const database = require("../config/database");
const { DataTypes } = require("sequelize");

const Professional = database.define(
  "professionals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Professional.associate = (models) => {
  Professional.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = Professional;
