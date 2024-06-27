import { sequelize, Model, DataTypes } from "../connect.js";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('client', 'admin'),
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);