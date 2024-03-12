import { Hono } from "hono";
import { verify } from "hono/jwt";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

type TUserData = {
    role: "Student" | "Admin";
    email: string;
};

const studentRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    };
}>();

studentRouter.use("/*", async (c, next) => {
    try {
        const header = c.req.header("authorization") || "";
        if (!header) {
            c.status(403);
            return c.json({
                msg: "Unauthorized",
            });
        }
        const token = header.split(" ")[1];
        const userData = await verify(token, c.env?.JWT_SECRET);
        if (!userData) {
            c.status(403);
            return c.json({
                msg: "Unauthorized and no userData found",
            });
        }
        c.set("jwtPayload", userData);
        await next();
    } catch (error: any) {
        c.text(error.message);
    }
});

studentRouter.get("/tests", async (c, next) => {
    const { email, id, role } = c.get("jwtPayload");
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const tests = await prisma.quiz.findMany();
        return c.json({ msg: "success", tests }, 200);
    } catch (error: any) {
        const message = error.message;
        return c.json({ msg: "fails", message }, 500);
    }
});

studentRouter.get("/tests/:quizId", async (c, next) => {
    const { email, id, role } = c.get("jwtPayload");
    const quizId = c.req.param("quizId");
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const test = await prisma.quiz.findFirst({
            where: { id: quizId },
            include: {
                questions: {
                    include: {
                        options: true, // Include all options for each question
                    },
                },
            },
        });
        return c.json({ msg: "success", test }, 200);
    } catch (error: any) {
        const message = error.message;
        return c.json({ msg: "fails", message }, 500);
    }
});

export default studentRouter;
