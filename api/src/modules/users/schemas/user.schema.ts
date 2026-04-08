import { z } from 'zod';

import { UserRoleSchema } from 'src/common/enums/user-role.enum';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  role: UserRoleSchema,
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({ email: true });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;


