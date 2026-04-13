import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().min(1),
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.coerce.number().default(6379),
    JWT_SECRET: z.string().min(16),
    MAIL_HOST: z.string().min(1),
    MAIL_PORT: z.coerce.number().default(1025),
    MOCKSERVER_URL: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
    const result = envSchema.safeParse(config);

    if (!result.success) {
        // Zod 4: result.error.issues (ya no .flatten())
        const messages = result.error.issues
            .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
            .join('\n');

        throw new Error(`\n Variables de entorno inválidas:\n${messages}\n`);
    }

    return result.data;
}