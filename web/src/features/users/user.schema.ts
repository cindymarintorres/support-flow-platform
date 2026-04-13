import { z } from 'zod';
import { BaseUserSchema, BaseUpdateUserSchema, UserEntitySchema } from '@support-flow/shared';

export const CreateUserSchema = BaseUserSchema.extend({
  // Mensajes de UX encima de las reglas del shared
  name: z.string().min(3, 'El nombre es obligatorio'),
  email: z.email({
    error: (issue) =>
      issue.input === '' || issue.input === undefined
        ? 'El correo es obligatorio'
        : 'Correo inválido'
  }),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  role: z.string().default('SOLICITANTE'),
});

export const UpdateUserSchema = BaseUpdateUserSchema;

// Re-exportamos para usarlo en auth.schema.ts
export { UserEntitySchema as UserSchema };

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;