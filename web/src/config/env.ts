import { z } from 'zod';

const envSchema = z.object({
    VITE_API_URL: z.string().min(1),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
    const messages = result.error.issues
        .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
        .join('\n');

    throw new Error(`\n Variables de entorno inválidas:\n${messages}\n`);
}

export const env = result.data;