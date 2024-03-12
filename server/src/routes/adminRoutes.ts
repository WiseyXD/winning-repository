import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

import { Hono } from "hono";
import { verify } from "hono/jwt";

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

export default adminRouter;
