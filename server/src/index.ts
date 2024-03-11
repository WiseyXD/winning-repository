import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    };
}>();

export interface Env {
    DATABASE_URL: string;
}

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
        data: {
            email: "aryan@gmail.com",
            password: "qwerty88**",
            role: "Admin",
        },
    });
    return c.json({ user });
});

export default app;
