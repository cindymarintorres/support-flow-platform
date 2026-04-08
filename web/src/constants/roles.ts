import { z } from "zod";

export const USER_ROLES = ['ADMINISTRADOR', 'AGENTE', 'SOLICITANTE'] as const;

export const UserRoleSchema = z.enum(USER_ROLES);

export type UserRole = z.infer<typeof UserRoleSchema>;
