import { Product } from "../db/models/product.js";

export const getAll = async() => {
  const allProducts = await Product.findAll();
  return allProducts;
};
 export const getOne = async( id ) => {
  const product = await Product.findOne({
    where: {
      id: id
    }
  });
  return product;
};

export const createOne = async( data ) => {
  //Evaluate if the product already exists
  await Product.sync();
  const createdProduct = await Product.create({
    lot_number: data.lot_number,
    product_name: data.product_name,
    price: data.price,
    available_quantity: data.available_quantity,
  });
  return createdProduct;
};

export const updateOne = async( id, data ) => {
  const product = await Product.update({
    lot_number: data.lot_number,
    product_name: data.product_name,
    price: data.price,
    available_quantity: data.available_quantity,
  },{
    where: {
      id: id
    }
  });
  return product;
};

export const deleteOne = async( id ) => {  
  await Product.destroy({
    where: {
      id: id
    }
  });
}