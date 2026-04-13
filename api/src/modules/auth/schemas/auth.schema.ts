import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email('El correo electrónico debe ser válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const ForgotPasswordSchema = z.object({
  email: z.email('El correo electrónico debe ser válido'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;