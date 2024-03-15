import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TestCard from "./TestCard";

export default function Tests() {
    return (
        <div className="basis-10/12 p-4">
            <div className="grid  md: grid-row-1 md: grid-row-2 lg:grid-cols-3">
                <TestCard />
            </div>
        </div>
    );
}
