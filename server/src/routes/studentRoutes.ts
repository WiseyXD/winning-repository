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
});

export default studentRouter;
