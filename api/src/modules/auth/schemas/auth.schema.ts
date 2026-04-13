import { z } from 'zod';
import {
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '@support-flow/shared';

// Re-exportamos directo — en Nest no necesitamos mensajes de UX
export { LoginSchema, ForgotPasswordSchema, ResetPasswordSchema };

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;