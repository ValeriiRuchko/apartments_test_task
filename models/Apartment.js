const { DataTypes } = require("sequelize");
const db = require("../util/database");

// defining our model
const Apartment = db.define(
  "apartment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
        len: [0, 98],
      },
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        min: 1,
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      validate: {
        len: [0, 998],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Apartment;
