import { Hono, Context } from "hono";
import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";


const signupRoute = new Hono();

signupRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { name, email, password } = body;
  const cryptPassword = await Bun.password.hash(password);
  const user: Prisma.UserCreateInput = {
    name, email, password: cryptPassword,
  };
  const newUser = await prisma.user.create({ data: user });
  c.status(201);
  return c.json(newUser);
});

export default signupRoute;
