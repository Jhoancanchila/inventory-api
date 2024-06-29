import z from 'zod';

const purchaseProductSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive()
});

const purchaseSchema = z.object({
  clientId: z.string().uuid(),
  products: z.array(purchaseProductSchema).min(1)
});

export const validatePurchase = (purchase) => {
  return purchaseSchema.safeParse(purchase);
}