import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { PlusCircle, Trash2 } from "lucide-react";
import { testSchema } from "@wiseyxd/winning-project-common";
import { useCreateTestMutation } from "@/app/api/admin/adminTestApi";
import { useState } from "react";

const duration = ["30", "60", "90", "120"];

const formSchema: any = z.object({
    description: z.string().min(10, "Minimum 10 Characters are required"),

    title: z
        .string()
        .min(2, "Minimum 2 Characters are required")
        .max(50, "Max 50 Characters are allowed"),

    duration: z.string({
        required_error: "Please select the Category to display.",
    }),

    questions: z.array(
        z.object({
            text: z.string().min(2, "Minimum 2 Characters are required"),
            options: z.array(
                z.object({
                    text: z
                        .string()
                        .min(2, "Minimum 2 Characters are required"),
                    right: z.boolean().default(false),
                })
            ),
        })
    ),
});

export default function CreateTest() {
    const [createTest] = useCreateTestMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            // @ts-ignore
            duration: "30mins",
            description: "",
            questions: [
                {
                    text: "",
                    options: [
                        {
                            text: "",
                            right: true,
                        },
                        {
                            text: "",
                            right: false,
                        },
                        {
                            text: "",
                            right: false,
                        },
                        {
                            text: "",
                            right: false,
                        },
                    ],
                },
            ],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    function handleAppend() {
        append({
            text: "",
            options: [
                {
                    text: "",
                    right: true,
                },
                {
                    text: "",
                    right: false,
                },
                {
                    text: "",
                    right: false,
                },
                {
                    text: "",
                    right: false,
                },
            ],
        });
    }

    function handleRemove(index: number) {
        remove(index);
    }

    async function onSubmit(values: z.infer<typeof testSchema>) {
        // console.log(values);
        const { title, description, questions, duration } = values;
        const formattedValues = {
            title,
            description,
            questions,
            duration: parseInt(duration),
        };
        console.log(formattedValues);
        setIsLoading(true);
        try {
            // @ts-ignore
            const { data, isFetching } = await createTest(formattedValues);
            setIsLoading(false);
            if (isFetching) null;
            toast({
                title: "Test Created",
            });

            form.reset();
            navigate("/admin");
        } catch (error) {
            toast({
                title: "Error while createing test entry.",
            });
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col mx-auto">
            <h1 className="mb-3 text-2xl">New Test Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Title of achievement
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test Duration</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        // @ts-ignore
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type of personell" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {duration.map((activity) => {
                                                return (
                                                    <SelectItem
                                                        value={activity}
                                                        key={activity}
                                                    >
                                                        {activity}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Type of achievement.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Achievement Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about the achievement"
                                        className="resize"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h1 className="text-xl mt-5">Questions's Details</h1>
                    {/* Add Grid for layout , md size screen */}
                    <div className="flex flex-col my-2">
                        {fields.map((question, index) => {
                            return (
                                <div key={index} className="">
                                    <div className="flex flex-col">
                                        <FormField
                                            control={form.control}
                                            name={`questions.${index}.text`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Question {index + 1}{" "}
                                                        Text
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Question"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2">
                                            {question.options.map(
                                                (option, i) => {
                                                    return (
                                                        <FormField
                                                            key={index}
                                                            control={
                                                                form.control
                                                            }
                                                            name={`questions.${index}.options.${i}.text`}
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Option{" "}
                                                                        {index +
                                                                            1}{" "}
                                                                        Text
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Option"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>{" "}
                                    <div className="mt-2 flex gap-2 justify-end">
                                        {index === fields.length - 1 && (
                                            <PlusCircle
                                                role="button"
                                                onClick={handleAppend}
                                            />
                                        )}
                                        {index != 0 &&
                                            index === fields.length - 1 && (
                                                <Trash2
                                                    role="button"
                                                    onClick={() =>
                                                        handleRemove(index)
                                                    }
                                                />
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
