import React, { useEffect } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGemini from "@/hooks/useGemini";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShimmerCards from "@/components/ShimmerCards";
import { useGetTestOverviewQuery } from "@/app/api/student/testApi";
import TestPreview from "@/components/TestPreview";
import TestStats from "@/components/TestStats";

export default function TestSubmitted() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const wrongQuestions = useSelector(
        (state: RootState) => state.testScore.wrongQuestions
    );
    const { testId } = useParams();
    const ans = useGemini(wrongQuestions);
    const finalScore = useSelector((state: RootState) => state.testScore.score);
    const { data, isFetching } = useGetTestOverviewQuery(testId);
    if (isFetching) return <ShimmerCards />;
    const test = data?.test;

    // No need for local state for 'ans' if it's already handled by useGemini hook

    return (
        <>
            <Navbar isAuthorized={isAuthorized} />
            <Separator />
            <div className="max-w-[90%] w-full mx-auto mt-4 max-h-screen">
                <Tabs defaultValue="overview" className="w-full ">
                    <TabsList>
                        <TabsTrigger value="overview">
                            Test Overview
                        </TabsTrigger>
                        <TabsTrigger value="stats">Test Statistics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <TestPreview
                            finalScore={finalScore}
                            test={test}
                            wrongQuestions={wrongQuestions}
                        />
                    </TabsContent>
                    <TabsContent value="stats">
                        <TestStats />
                    </TabsContent>
                </Tabs>

                <p>{ans}</p>
            </div>
        </>
    );
}
