import { z } from 'zod';
import { UserRoleSchema } from './user-role.schema';

export const BaseUserSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    role: UserRoleSchema,
});

export const BaseUpdateUserSchema = BaseUserSchema.partial();

// Entidad leída desde BD — tiene ID, no tiene password
export const UserEntitySchema = BaseUserSchema.omit({ password: true }).extend({
    id: z.string(),
});

export type BaseUserDto = z.infer<typeof BaseUserSchema>;
export type BaseUpdateUserDto = z.infer<typeof BaseUpdateUserSchema>;
export type UserEntity = z.infer<typeof UserEntitySchema>;