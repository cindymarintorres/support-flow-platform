import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email({ message: 'Correo electrónico inválido' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export const ForgotPasswordSchema = z.object({
    email: z.email({ message: 'Correo electrónico inválido' }),
});

export const ResetPasswordSchema = z.object({
    token: z.string().min(1, { message: 'El token es requerido' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),

});

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;