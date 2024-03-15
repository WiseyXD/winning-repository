import * as z from "zod";
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const testSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    duration: z.ZodNumber;
    questions: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            right: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            right?: boolean | undefined;
        }, {
            text: string;
            right?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        options: {
            text: string;
            right?: boolean | undefined;
        }[];
        text: string;
    }, {
        options: {
            text: string;
            right?: boolean | undefined;
        }[];
        text: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    duration: number;
    questions: {
        options: {
            text: string;
            right?: boolean | undefined;
        }[];
        text: string;
    }[];
}, {
    title: string;
    description: string;
    duration: number;
    questions: {
        options: {
            text: string;
            right?: boolean | undefined;
        }[];
        text: string;
    }[];
}>;
export type TSignup = z.infer<typeof signupSchema>;
export type TLogin = z.infer<typeof loginSchema>;
export type TTest = z.infer<typeof testSchema>;
