const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Tenant = sequelize.define("Tenant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tenant;
