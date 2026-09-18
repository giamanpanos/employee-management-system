const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Email must be valid",
        },
      },
    },

    position: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    salary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: "Salary cannot be negative",
        },
      },
    },
  },
  {
    tableName: "employees",
    timestamps: true,
  },
);

module.exports = Employee;
