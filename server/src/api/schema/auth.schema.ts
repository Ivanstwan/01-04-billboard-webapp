import { z } from 'zod';

// Schema
// Mostly for validating request body/params

export const RegisterSchema = z.object({ email: z.string().email() });
export type Register = z.infer<typeof RegisterSchema>;
