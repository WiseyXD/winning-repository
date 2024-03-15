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

type TestCardProps = {
    title: string;
    description: string;
    noOfQuestions: number;
    duration: number;
    expiresOn: Date;
};

export default function TestCard({
    title,
    description,
    duration,
    noOfQuestions,
    expiresOn,
}: TestCardProps) {
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
                    <div className="flex gap-1 space-y-1.5">
                        <p>Expires On :</p>
                        {moment(expiresOn).calendar()}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Give </Button>
            </CardFooter>
        </Card>
    );
}
