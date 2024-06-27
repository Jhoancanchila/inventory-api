import { createPurchase, getPurchase, getPurchases, updatePurchase } from '../services/purchaseService.js';
import { createPurchaseProduct } from '../services/purchaseProductService.js';
import { getOne } from '../services/productService.js';

export const getAllPurchases = async( req, res ) => {
  try {
    const purchases = await getPurchases();

    return res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error get all purchases' });
  }
};
export const createOnePurchase = async( req, res ) => {
  //products from client
  const { products } = req.body;

  try {
    // crear compra
    const purchase = await createPurchase({});

    let total = 0;

    // Añade los productos a la compra y calcula el total
    for (const item of products) {
        const product = await getOne(item.productId);

        // Si el producto no existe, retorna un error
        if (!product) {
            return res.status(404).json({ message: `Product ${item.productId} not found` });
        }

        const subtotal = product.price * item.quantity;
        total += subtotal;

        const newProductToPurchase = {
          PurchaseId: purchase.id,
          ProductId: item.productId,
          quantity: item.quantity
        };
        await createPurchaseProduct(newProductToPurchase);
    }

    // Actualiza el total de la compra
    purchase.total = total;
    await updatePurchase(purchase);

    //compra completa
    const purchaseComplete = await getPurchase(purchase.id);
    return res.status(201).json(purchaseComplete);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating purchase'});
  }

}