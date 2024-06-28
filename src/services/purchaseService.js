import { Purchase } from "../db/models/purchase.js";
import { Product } from "../db/models/product.js";
import { User } from "../db/models/user.js";

export const getPurchases = async( clientId ) => {
  const allPurchases = await Purchase.findAll({
    include: {
      model: Product,
      through: {
          attributes: ['quantity']
      }
    },
    where: clientId ? { clientId } : {}
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
    include: [
      {
          model: User,
          attributes: ['id', 'name', 'email'],
          as: 'client'
      },
      {
          model: Product,
          as: 'products',
          through: {
            attributes: ['quantity'],
          }
      }
  ]
  });
  // Remover la propiedad clientId
  const newPurchases = purchase.toJSON();
  delete newPurchases.clientId; 
  return newPurchases;
};

export const updatePurchase = async( data ) => {
  const purchase = await Purchase.update(data,{
    where: {
      id: data.id
    }
  });
  return purchase;
}
