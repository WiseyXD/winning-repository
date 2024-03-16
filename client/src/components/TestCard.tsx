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
    const navigate = useNavigate();
    return (
        <Card
            className="w-[350px]"
            role="button"
            onClick={() => navigate(`/${testId}`)}
        >
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
            <CardFooter className="flex justify-end">
                <Button>Give </Button>
            </CardFooter>
        </Card>
    );
}
