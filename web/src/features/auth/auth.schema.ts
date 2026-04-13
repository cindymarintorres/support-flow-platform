import { z } from 'zod';
import {
  LoginSchema as BaseLoginSchema,
  ForgotPasswordSchema as BaseForgotPasswordSchema,
  ResetPasswordSchema as BaseResetPasswordSchema,
} from '@support-flow/shared';
import { UserEntitySchema } from '@support-flow/shared';

// Extendemos con mensajes de UX
export const LoginSchema = BaseLoginSchema.extend({
  email: z.email({
    error: (issue) =>
      issue.input === '' || issue.input === undefined
        ? 'El correo es obligatorio'
        : 'Correo inválido'
  }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const ForgotPasswordSchema = BaseForgotPasswordSchema.extend({
  email: z.email({
    error: (issue) =>
      issue.input === '' || issue.input === undefined
        ? 'El correo es obligatorio'
        : 'Correo inválido'
  }),
});

// React omite token — viene por URL params, no del formulario
export const ResetPasswordSchema = BaseResetPasswordSchema.omit({ token: true });

export const AuthResponseSchema = z.object({
  user: UserEntitySchema,
  token: z.string(),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;