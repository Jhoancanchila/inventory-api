import { sequelize, Model, DataTypes } from "../connect.js";

import { User } from "./user.js";

export class Purchase extends Model {}

Purchase.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
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

User.hasMany(Purchase, { foreignKey: 'clientId' });
Purchase.belongsTo(User, { foreignKey: 'clientId',as: 'client'});


