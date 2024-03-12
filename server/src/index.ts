import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

import auth from "./routes/auth";
import studentRouter from "./routes/studentRoutes";
import adminRouter from "./routes/adminRoutes";

const app = new Hono();

export interface Env {
    DATABASE_URL: string;
}

app.route("/auth", auth);
app.route("/student", studentRouter);
app.route("/admin", adminRouter);

export default app;
