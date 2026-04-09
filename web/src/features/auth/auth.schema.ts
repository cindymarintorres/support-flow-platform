import { z } from 'zod';
import { UserSchema } from '../users/user.schema'; // Importamos el usuario base

// ==========================================
// 1. ESQUEMAS DE PETICIÓN (Formularios)
// ==========================================

export const LoginSchema = z.object({
  email: z.email('Correo inválido').min(1, 'El correo es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// --- PASO 1: Solicitar recuperación ---
export const ForgotPasswordSchema = z.object({
  email: z.email('Correo inválido'),
});

// --- PASO 2: Restablecer contraseña ---
export const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
})
// .refine() valida datos cruzados en el formulario
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // Esto hace que el error aparezca debajo del input de "confirmPassword"
});


// ==========================================
// 2. ESQUEMAS DE RESPUESTA (Desde la API)
// ==========================================

export const AuthResponseSchema = z.object({
  user: UserSchema, // ¡Reutilizamos la entidad del otro feature!
  token: z.string(),
});


// ==========================================
// 3. TIPOS (DTOs)
// ==========================================

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>