import { createPurchase, getPurchase, getPurchases, updatePurchase } from '../services/purchaseService.js';
import { createPurchaseProduct } from '../services/purchaseProductService.js';
import { getOne } from '../services/productService.js';
import { getUser } from '../services/authService.js';

export const getAllPurchases = async( req, res ) => {
  try {
    const purchases = await getPurchases();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Purchases found',
      data: purchases
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      statusCode: 500,
      message: 'error get all purchases'
    });
  }
};

export const getPurchasesById = async( req, res ) => {
  const { id } = req.params;

  try {
    const purchase = await getPurchase(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Purchase found',
      data: purchase
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      statusCode: 500,
      message: 'Error getting purchase'
    });
  }
};
export const getPurchasesByClient = async( req, res ) => {
  const { clientId } = req.params;

  try {
    const purchases = await getPurchases(clientId);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Purchases found',
      data: purchases
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      statusCode: 500,
      message: 'Error getting purchases'
    });
  }
};

export const createOnePurchase = async( req, res ) => {
  //products from client
  const { clientId, products } = req.body;

  try {
    const user = await getUser(clientId);
    if (!user || user.role !== 'client') {
      return res.status(404).json({ 
        status: false,
        statusCode: 404,
        message: `Access denied: You do not have the appropriate role.`
      });
    }
    // crear compra
    const purchase = await createPurchase({ clientId });

    let total = 0;

    // Añade los productos a la compra y calcula el total
    for (const item of products) {
        const product = await getOne(item.productId);

        // Si el producto no existe, retorna un error
        if (!product) {
          return res.status(404).json({ 
            status: false,
            statusCode: 404,
            message: `Product ${item.productId} not found`
          });
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
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Purchase created',
      data: purchaseComplete
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      statusCode: 500,
      message: 'Error creating purchase'
    });
  }

}