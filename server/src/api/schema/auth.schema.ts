import { z } from 'zod';

// Schema
// Mostly for validating request body/params

export const RegisterSchema = z.object({ email: z.string().email() });
export type Register = z.infer<typeof RegisterSchema>;

export const CreateUserSchema = z.object({
    token: z.string(),
    password: z.string().min(8).max(64),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
});
export type Login = z.infer<typeof LoginSchema>;
