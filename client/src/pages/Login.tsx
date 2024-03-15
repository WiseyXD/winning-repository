("use client");
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setAuth } from "@/features/auth/authSlice";
import { useAdminLoginMutation, useLoginMutation } from "@/app/api/authApi";
import { useToast } from "@/components/ui/use-toast";

type SignupProps = {
    isAdmin: boolean;
};

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be 5 Characters Long"),
});

export default function Login({ isAdmin }: SignupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [studentLogin] = useLoginMutation();
    const [adminLogin] = useAdminLoginMutation();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            if (!isAdmin) {
                // @ts-ignore
                const { data, isFetching } = await studentLogin(values);
                if (isFetching) return null;
                if (data.msg !== "success") {
                    toast({
                        title: "Loggin Failed due to Invalid Credentials",
                    });
                    setIsLoading(false);
                    return;
                }
                dispatch(setAuth(data));
                toast({
                    title: "Logged in as " + data.email,
                });
                setIsLoading(false);

                form.reset();
            } else {
                // @ts-ignore

                const { data, isFetching } = await adminLogin(values);
                if (isFetching) return null;
                if (data.msg !== "success") {
                    toast({
                        title: "Loggin Failed due to Invalid Credentials",
                    });
                    setIsLoading(false);

                    return;
                }
                dispatch(setAuth(data));
                toast({
                    title: "Logged in as " + data.email,
                });
                setIsLoading(false);

                form.reset();
            }
        } catch (error) {
            setIsLoading(false);

            toast({
                title: "Loggin Failed due to Server Error",
            });
        }
    }
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <p className=" font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
                <div className=" min-h-[80vh] flex justify-center items-center">
                    <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-slate-800">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Welcome to proctor.ai
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Login to proctor.ai if you can because we don&apos;t
                            have a login flow yet
                        </p>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-4 mt-4 dark:text-neutral-300"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="sahilkappa@example.com"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="qwe153**"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <button
                                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    type="submit"
                                >
                                    Login &rarr;
                                    <BottomGradient />
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </p>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
