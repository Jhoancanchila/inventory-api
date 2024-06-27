import { sequelize, Model, DataTypes } from "../connect.js";

export class Purchase extends Model {}

Purchase.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
  },
  total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
  },
}, {
  sequelize,
  modelName: "Purchase",
});