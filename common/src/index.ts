import * as z from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be characters long"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be characters long"),
});

const optionSchema = z.object({
    text: z.string(),
    right: z.boolean().optional(),
});

const questionSchema = z.object({
    text: z.string(),
    options: z.array(optionSchema),
});

export const testSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),

    questions: z.array(questionSchema),
});

export type TSignup = z.infer<typeof signupSchema>;
export type TLogin = z.infer<typeof loginSchema>;
export type TTest = z.infer<typeof testSchema>;
