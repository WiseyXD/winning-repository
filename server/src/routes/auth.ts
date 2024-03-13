import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { env } from "hono/adapter";

import { Hono } from "hono";
import { sign } from "hono/jwt";
import { loginSchema, signupSchema } from "@wiseyxd/winning-project-common";

const auth = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

auth.post("/student/signup", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const { success, error }: any = signupSchema.safeParse(body);
    if (!success) {
        const message = error.message;
        return c.json({ msg: "fails", message }, 500);
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                role: "Student",
            },
        });
        const token = await sign(
            { role: user.role, email: user.email, id: user.id },
            c.env.JWT_SECRET
        );

        return c.json({ msg: "success", token }, 201);
    } catch (err: any) {
        c.status(500);
        return c.json({ msg: err.message });
    }
});

auth.post("/admin/signup", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { success, error }: any = signupSchema.safeParse(body);
        if (!success) {
            const message = error.message;
            return c.json({ msg: "fails", message }, 500);
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                role: "Admin",
            },
        });
        const token = await sign(
            { role: user.role, email: user.email, id: user.id },
            c.env.JWT_SECRET
        );
        return c.json({ msg: "success", token }, 201);
    } catch (err: any) {
        c.status(500);
        return c.json({ msg: err.message });
    }
});

auth.post("/student/login", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { success, error }: any = loginSchema.safeParse(body);
        if (!success) {
            const message = error.message;
            return c.json({ msg: "fails", message }, 500);
        }
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
                role: "Student",
            },
        });
        if (user == null) throw Error("User does not exist in DB");
        const token = await sign(
            { role: user.role, email: user.email, id: user.id },
            c.env.JWT_SECRET
        );

        return c.json({ msg: "success", token }, 200);
    } catch (err: any) {
        c.status(500);
        return c.json({ msg: err.message });
    }
});

auth.post("/admin/login", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { success, error }: any = loginSchema.safeParse(body);
        if (!success) {
            const message = error.message;
            return c.json({ msg: "fails", message }, 500);
        }
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
                role: "Admin",
            },
        });
        if (!user) throw Error("User does not exist in DB");
        const token = await sign(
            { role: user.role, email: user.email, id: user.id },
            c.env.JWT_SECRET
        );

        return c.json({ msg: "success", token }, 200);
    } catch (err: any) {
        c.status(500);
        return c.json({ msg: err.message });
    }
});

export default auth;
