import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function TestCard() {
  return (
     <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Test Ttitle</CardTitle>
                        <CardDescription>
                            Test Description
                            {/* substring to 30 */}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex gap-1 space-y-1.5">
                                <p>Duration :</p>
                                60 Mins
                            </div>
                            <div className="flex gap-1 space-y-1.5">
                                <p>No of Questions :</p>
                                10
                            </div>
                            <div className="flex gap-1 space-y-1.5">
                                <p>Valid Date :</p>
                                10
                                {/* Moment lib for formatting Date */}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Give </Button>
                    </CardFooter>
                </Card>
  )
}
