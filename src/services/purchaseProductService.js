import { PurchaseProduct } from "../db/models/purchaseProduct.js";

export const createPurchaseProduct = async( data ) => {
  await PurchaseProduct.sync();
  const createdPurchaseProduct = await PurchaseProduct.create(data);
  return createdPurchaseProduct;
};