import { z } from 'zod';

export const USER_ROLES = ['ADMINISTRADOR', 'AGENTE', 'SOLICITANTE'] as const;

export const UserRoleSchema = z.enum(USER_ROLES, { message: 'Rol de usuario inválido' });
export const UserRoleValues = UserRoleSchema.enum;

export type UserRole = z.infer<typeof UserRoleSchema>;  