import { useGetAllTestsQuery } from "@/app/api/student/testApi";
import TestCard from "./TestCard";
import ShimmerCards from "./ShimmerCards";

export default function Tests() {
    const { data, isFetching } = useGetAllTestsQuery(null);
    if (isFetching) return <ShimmerCards />;
    const tests = data?.tests;
    console.log(tests);
    return (
        <div className="basis-10/12 p-4">
            <div className="grid  md: grid-row-1 md: grid-row-2 lg:grid-cols-3">
                {tests?.map((test, index) => {
                    return (
                        <TestCard
                            title={test.title}
                            duration={test.duration}
                            noOfQuestions={test.questions?.length}
                            expiresOn={test.validityDate}
                            description={test.description}
                        />
                    );
                })}
            </div>
        </div>
    );
}
