import { z } from 'zod';
import { BaseUpdateUserSchema, BaseUserSchema } from '@support-flow/shared';

export const CreateUserSchema = BaseUserSchema;

// Nest omite email del update — tiene su propio endpoint
export const UpdateUserSchema = BaseUpdateUserSchema.omit({ email: true });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;