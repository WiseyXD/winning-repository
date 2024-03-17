import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useDeleteTestMutation } from "@/app/api/admin/adminTestApi";
import ShimmerCards from "./ShimmerCards";
import { useToast } from "./ui/use-toast";

type TestCardProps = {
    title: string;
    description: string;
    noOfQuestions: number;
    duration: number;

    testId: string;
};

export default function TestCard({
    title,
    description,
    duration,
    noOfQuestions,

    testId,
}: TestCardProps) {
    const isAdmin = useSelector((state: RootState) => state.root.auth.admin);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [deleteTest] = useDeleteTestMutation();

    async function handleDelete(id: string) {
        // @ts-ignore
        const { data, isFetching } = await deleteTest(id);
        if (isFetching) return <ShimmerCards />;
        console.log(data);
        toast({
            title: "Test Delete",
            variant: "destructive",
        });
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                    {/* substring to 30 */}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-2">
                    <div className="flex gap-1 space-y-1.5">
                        <p>Duration :</p>
                        {duration}
                    </div>
                    <div className="flex gap-1 space-y-1.5">
                        <p>No of Questions :</p>
                        {noOfQuestions}
                    </div>
                </div>
            </CardContent>
            {isAdmin ? (
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={() => handleDelete(testId)}
                        variant={"destructive"}
                    >
                        Delete{" "}
                    </Button>
                </CardFooter>
            ) : (
                <CardFooter className="flex justify-end">
                    <Button onClick={() => navigate(`/${testId}`)}>
                        Give{" "}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
