import { z } from 'zod';
import { UserSchema } from '../users/user.schema'; // Importamos el usuario base

// ---Esquema para iniciar sesión ---
export const LoginSchema = z.object({
  email: z.email('Correo inválido').min(1, 'El correo es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// ---Esquema para solicitar recuperación de contraseña ---
export const ForgotPasswordSchema = z.object({
  email: z.email('Correo inválido'),
});

// ---Esquema para restablecer contraseña ---
export const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})
  // .refine() valida datos cruzados en el formulario
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // Esto hace que el error aparezca debajo del input de "confirmPassword"
  });

// ---Esquema para respuesta de autenticación ---
export const AuthResponseSchema = z.object({
  user: UserSchema, // ¡Reutilizamos la entidad del otro feature!
  token: z.string(),
});


// ---Tipos (DTOs) ---
export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>