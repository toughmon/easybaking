import { z } from 'zod';

/**
 * Typed, validated runtime config. Expo inlines any `EXPO_PUBLIC_*` env var into
 * the bundle, so define values in a `.env` file (see .env.example) and read them
 * here. Parsing fails fast at startup if a required value is missing/malformed.
 */
const schema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  /** Base URL of the backend API. Optional while running on mock data. */
  API_URL: z.string().optional(),
});

export const env = schema.parse({
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  API_URL: process.env.EXPO_PUBLIC_API_URL,
});

export type Env = z.infer<typeof schema>;
