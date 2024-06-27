import { Purchase } from "../db/models/purchase.js";
import { Product } from "../db/models/product.js";

export const getPurchases = async() => {
  const allPurchases = await Purchase.findAll({
    include: {
      model: Product,
      through: {
          attributes: ['quantity']
      }
  }
  });
  return allPurchases;
};

export const createPurchase = async( data ) => {
  await Purchase.sync();
  const createdPurchase = await Purchase.create(data);
  return JSON.parse(JSON.stringify(createdPurchase));
};

export const getPurchase = async( id ) => {
  const purchase = await Purchase.findOne({
    where: {
      id
    },
    include: {
      model: Product,
      through: {
          attributes: ['quantity']
      }
  }
  });
  return purchase;
};

export const updatePurchase = async( data ) => {
  const purchase = await Purchase.update(data,{
    where: {
      id: data.id
    }
  });
  return purchase;
}
