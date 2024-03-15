import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

import { Hono } from "hono";
import { verify } from "hono/jwt";
import { testSchema } from "@wiseyxd/winning-project-common";

type TUserData = {
    role: "Student" | "Admin";
    email: string;
};

const adminRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    };
}>();

adminRouter.use("/*", async (c, next) => {
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
        if (userData.role != "Admin") {
            c.status(403);
            return c.json({
                msg: "Unauthorized as you are not an Admin",
            });
        }
        c.set("jwtPayload", userData);
        await next();
    } catch (error: any) {
        c.text(error.message);
    }
});

adminRouter.get("/tests", async (c, next) => {
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

// Duration Test

adminRouter.post("/tests/create", async (c, next) => {
    const { email, id, role } = c.get("jwtPayload");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success, error }: any = testSchema.safeParse(body);
        if (!success) {
            const message = error.message;
            return c.json({ msg: "fails", message }, 501);
        }
        const quiz = await prisma.quiz.create({
            data: {
                title: body.title,
                description: body.description,
                duration: body.duration,
                creatorId: id,
            },
        });

        // Create questions and options for the quiz
        const createdQuestions = await Promise.all(
            body.questions.map(async (question: any) => {
                const { text, options } = question;
                // Create the question and associate it with the quiz
                const createdQuestion = await prisma.question.create({
                    data: {
                        text: text,
                        quiz: { connect: { id: quiz.id } },
                    },
                });

                // Create options for the question
                const createdOptions = await prisma.option.createMany({
                    data: options.map((option: any) => ({
                        text: option.text,
                        right: option.right,
                        questionId: createdQuestion.id,
                    })),
                });

                return createdQuestion;
            })
        );

        return c.json({ msg: "success", quiz, createdQuestions }, 201);
    } catch (error: any) {
        const message = error.message;
        return c.json({ msg: "fails", message }, 500);
    }
});

adminRouter.delete("/tests/delete/:quizId", async (c, next) => {
    const { email, id, role } = c.get("jwtPayload");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const quizId = c.req.param("quizId");

        const quiz = await prisma.quiz.delete({
            where: {
                id: quizId,
            },
        });

        await prisma.option.deleteMany();
        await prisma.quiz.deleteMany();

        return c.json({ msg: "success", quiz }, 200);
    } catch (error: any) {
        const message = error.message;
        return c.json({ msg: "fails", message }, 500);
    }
});

export default adminRouter;
