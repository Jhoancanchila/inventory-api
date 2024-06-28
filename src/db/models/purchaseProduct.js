import { sequelize, Model, DataTypes } from "../connect.js";
import { Product } from "./product.js";
import { Purchase } from "./purchase.js";

export class PurchaseProduct extends Model {}

PurchaseProduct.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
}, {
  sequelize,
  modelName: "PurchaseProduct"
});

//relaciones
Product.belongsToMany(Purchase, { through: PurchaseProduct});
Purchase.belongsToMany(Product, { through: PurchaseProduct, as: 'products'});