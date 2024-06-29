import z from 'zod';

const registerSchema = z.object({
  email: z.string().email(
    'Please provide a valid email address'
  ),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(['admin', 'client']).default('admin')
});

export const validateRegister = (user) => {
  return registerSchema.safeParse(user);
}