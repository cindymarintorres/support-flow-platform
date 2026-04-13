import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const ForgotPasswordSchema = z.object({
    email: z.email(),
});

export const ResetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(6),
    confirmPassword: z.string(),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;