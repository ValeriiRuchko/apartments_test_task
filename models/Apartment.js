const { DataTypes } = require("sequelize");
const db = require("../util/database");

// defining our model
const Apartment = db.define(
  "apartment",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rooms: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 1,
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 1,
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      validate: {
        len: [0, 1000],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Apartment;
