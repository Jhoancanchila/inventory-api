import z from 'zod';

export const productSchema = z.object({
  lot_number: z.number().int().positive(),
  product_name: z.string(),
  price: z.number().int().positive(),
  available_quantity: z.number().int().positive()
});

export const validateProduct = (product) => {
  return productSchema.safeParse(product);
}