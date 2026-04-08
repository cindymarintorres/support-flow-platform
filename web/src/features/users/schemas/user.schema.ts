import { z } from 'zod';
import { UserRoleSchema } from '../../../constants/roles';

// ==========================================
// 1. ESQUEMAS (Zod)
// ==========================================

// Base (Lo que comparten todos)
export const BaseUserSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.email('Correo inválido'),
  role: UserRoleSchema.default('SOLICITANTE'),
});

// Entidad BD (Lectura - Tiene ID, NO tiene password)
export const UserSchema = BaseUserSchema.extend({
  id: z.string(),
});

// Creación (Escritura - Tiene password, NO tiene ID)
export const CreateUserSchema = BaseUserSchema.extend({
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

// Actualización (Todo es opcional, ideal para un PATCH)
// El método .partial() de Zod hace que todos los campos sean opcionales automáticamente
export const UpdateUserSchema = CreateUserSchema.partial(); 


// ==========================================
// 2. TIPOS (TypeScript DTOs)
// ==========================================

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;